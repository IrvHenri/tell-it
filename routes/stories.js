const express = require("express");
const router = express.Router();
module.exports = (db) => {
  // GET homepage
  router.get("/", (req, res) => {
    let query = `
    SELECT stories.* , users.avatar, users.username
    FROM stories
    JOIN users ON stories.user_id = users.id
    ORDER BY created_at;
    `;
    db.query(query)
      .then((data) => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Route for Getting both the story, and it's associated contributions
  router.get("/:storyId", (req, res) => {
    const retObj = {};
    db.query(
      `
      SELECT stories.*, users.avatar, users.username
      FROM stories
      JOIN users ON users.id = stories.user_id WHERE stories.id = $1;
      `,
      [req.params.storyId]
    )
      .then((data) => {
        retObj.story = data.rows[0];
        //you just want to get contributions that weren't accepted.
        db.query(
          `
          SELECT contributions.*, users.username , users.avatar
          FROM contributions
          JOIN users ON users.id = contributions.user_id
          WHERE story_id = $1
          AND contributions.is_accepted = 'not reviewed'
          ORDER BY created_at;
          `,
          [req.params.storyId]
        )
          .then((data) => {
            retObj.contributions = data.rows;
            console.log("Contributions:", retObj.contributions);
            res.json(retObj);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  //Route that gets author by storyID
  // router.get("/:story_id/author", (req, res) => {
  //   db.query(
  //     `
  //       SELECT * FROM users
  //       JOIN stories ON user_id = users.id
  //       WHERE stories.id = $1
  //     `,
  //     [req.params.story_id]
  //   )
  //     .then((data) => res.json(data.rows[0]))
  //     .catch((err) => res.status(400).json(err));
  // });

  //Gets all accepted contributions for story, and orders by c
  router.get("/:story_id/acceptedContributions", (req, res) => {
    db.query(
      `
      SELECT * FROM contributions
      WHERE story_id = $1 AND is_accepted = 'accepted'
      ORDER BY accepted_at ASC;
    `,
      [req.params.story_id]
    )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => console.log(err));
  });

  //Submit New Story
  router.post("/", (req, res) => {
    const { title, initial_content, user_id, created_at } = req.body;
    let query = `INSERT INTO stories (user_id, title,initial_content,created_at) VALUES ($1, $2 , $3, $4) RETURNING *`;
    let values = [user_id, title, initial_content, created_at];
    db.query(query, values)
      .then(() => {
        res.status(204).json({ message: "Success" });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Form that submits contribution
  router.post("/:story_id/contribution", (req, res) => {
    let query = `INSERT INTO contributions (user_id, story_id, content, created_at) VALUES ($1, $2, $3, $4) RETURNING *`;
    const { user_id, story_id, content, created_at } = req.body;
    if (!user_id) {
      return res
        .status(403)
        .json({ error: "User must be logged in to submit a contribution." });
    }
    let values = [user_id, story_id, content, created_at];
    if (content) {
      db.query(query, values)
        .then(() => {
          res.status(204).json({ message: "Success" });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    } else {
      res.status(500).json({ error: "Contribution text cannot be empty." });
    }
  });

  // User marks story complete
  router.post("/:story_id", (req, res) => {
    const { user_id, story_id } = req.body;
    db.query(
      `
      SELECT user_id FROM stories
      WHERE id = $1;
      `,
      [story_id]
    ).then((data) => {
      if (data.rows[0].user_id === parseInt(user_id)) {
        let query = "UPDATE stories SET is_complete = TRUE WHERE id = $1  ";
        let story_idToInt = Number(story_id);
        let values = [story_idToInt];
        db.query(query, values)
          .then(() => {
            res.status(204).json({ message: "Success" });
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      } else {
        res.status(403).json({
          error: "Users may only mark their own stories as complete.",
        });
      }
    });
  });
  return router;
};

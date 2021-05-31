const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET homepage
  router.get("/", (req, res) => {
    let query = `
    SELECT stories.* , users.avatar, users.username
    FROM stories
    JOIN users ON stories.user_id = users.id;`;
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
      SELECT stories.*, users.avatar, users.username FROM stories JOIN users ON users.id = stories.user_id WHERE stories.id = $1;
      `,
      [req.params.storyId]
    )
      .then((data) => {
        retObj.story = data.rows[0];
        db.query(
          `
        SELECT contributions.*, users.username FROM contributions JOIN users ON users.id = contributions.user_id WHERE story_id = $1
        `,
          [req.params.storyId]
        )
          .then((data) => {
            retObj.contributions = data.rows;
            res.json(retObj);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  router.post("/", (req, res) => {
    const { title, initial_content, user_id } = req.body;
    console.log(title, initial_content, user_id);
    let query = `INSERT INTO stories (user_id, title,initial_content) VALUES ($1, $2 , $3) RETURNING *`;
    let values = [user_id, title, initial_content];
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
    let query = `INSERT INTO contributions (user_id, story_id, content) VALUES ($1, $2, $3) RETURNING *`;
    const { user_id, story_id, content } = req.body;
    console.log(user_id, story_id, content);
    let values = [user_id, story_id, content];
    db.query(query, values)
      .then(() => {
        res.status(204).json({ message: "Success" });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // User marks story complete

  router.post("/:story_id", (req, res) => {
    let query = "UPDATE stories SET is_complete = TRUE WHERE id = $1  ";
    let values = [req.params.story_id];

    db.query(query, values)
      .then(() => {
        res.status(204).json({ message: "Success" });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });
  return router;
};

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    db.query(`
    SELECT * FROM users WHERE id = $1;
    `,[req.params.id])
    .then(data => {
      const user = data.rows[0]
      if(user){
        res.json(user)
      } else {
        res.status(400).json("Error. User does not exist!")
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message})
    })
  })

  router.get("/:id/stories", (req, res) => {
    db.query(`
    SELECT users.*, stories.* FROM stories
    JOIN users ON user_id = users.id
    WHERE user_id = $1;
    `,[req.params.id])
    .then(data => {
      const stories = data.rows
      if(stories.length > 1) {
        res.json({stories})
      } else {
        res.status(400).json("Disply something different if user has no stories.")
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })
  return router;
};

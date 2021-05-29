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
    .then(data => res.json(data.rows[0]))
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
    .then(data => res.json(data.rows))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })
  return router;
};

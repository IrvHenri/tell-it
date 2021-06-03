const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/login', (req, res) => {
    db.query(`
    SELECT * FROM users
    WHERE username = $1
    `,[req.body.loginVal])
    .then(data => {
      const user = data.rows[0];
      if(user) {
        res.json(user)
      } else {
        res.status(400).json({error: "Error. User Does not exist..."})
      }
    })
    .catch(err => {
      res.status(500).json(err)
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
      res.json({stories})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })
  return router;
};

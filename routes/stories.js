/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET homepage
  router.get("/", (req, res) => {
    let query = `SELECT stories.* , users.*
    FROM stories
    JOIN users ON stories.user_id = users.id;`;
    db.query(query)
      .then((data) => {
        console.log(data);
        const stories = data.rows;
        res.json({ stories });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    let query = `'INSERT INTO stories (user_id, title,initial_content) VALUES ($1, $2)`;
    let values = [1];
    db.query(query)
      .then((data) => {
        console.log(data);
        const stories = data.rows;
        res.json({ stories });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

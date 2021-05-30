/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

module.exports = (db) => {
  // GET homepage
  router.get("/", (req, res) => {
    let query = `
    SELECT stories.* , users.*
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
  router.get('/:storyId', (req, res) => {
    const retObj = {};
    db.query(
      `
      SELECT stories.* FROM stories WHERE id = $1;
      `,[req.params.storyId]
    ).then(data => {
      retObj.story = data.rows[0]
      db.query(
        `
        SELECT contributions.* FROM contributions WHERE story_id = $1
        `,[req.params.storyId]
      ).then(data => {
        retObj.contributions = data.rows;
        res.json(retObj)
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  })

  router.post("/", (req, res) => {
    const { title, initial_content } = req.body;
    console.log({ title, initial_content });
    res.status(201).send();
    // let query = `'INSERT INTO stories (user_id, title,initial_content) VALUES ($1, $2 , $3)`;
    // let values = [user_id,title,initial_content];
    // db.query(query,values)
    //   .then((data) => {
    //     console.log(data);
    //     const stories = data.rows;
    //
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
  });
  return router;
};

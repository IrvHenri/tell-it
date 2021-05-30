const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM contributions;`)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Author Accepts Contribution
  router.get('/:contribution_id', (req, res) => {
    //Check if contribution's status is not_reviewed
    db.query(`
    SELECT id, story_id, is_accepted
    FROM contributions
    WHERE contributions.id = $1;
    `,[req.params.contribution_id])
    .then(data => {
      const {id, story_id, is_accepted} = data.rows[0]
      console.log(id, story_id, is_accepted)
      if(is_accepted === 'not reviewed'){
        db.query(`
        UPDATE contributions
        SET is_accepted = CASE
          WHEN (contributions.id = $1 AND contributions.story_id = $2) THEN 'accepted'
          WHEN (contributions.id <> $1 AND contributions.story_id = $2) THEN 'rejected'
          ELSE 'not reviewed'
        END
        RETURNING *;
        `,[id, story_id])
        .then(data => {
          res.json(data.rows)
        })
      } else {
        res.status(400).json({error: "ERROR: This contribution has already been reviewed"})
      }
    })
    .catch(err => console.log(err))
  })

  //Upvote Contribution
  router.post('/:contribution_id/upvote', (req, res) => {
    //Check if the user upvoting has already upvoted this post
    const userId = req.body.user_id;
    db.query(`
    SELECT * FROM upvotes
    WHERE contribution_id = $1
    AND user_id = $2
    `,[req.params.contribution_id, userId])
    .then(data => {
      //If data is empty, then no upvote exists. Go ahead and add one.

      //Else, return an error
    })
    .catch(err => console.log(err))
  })
  return router;
};

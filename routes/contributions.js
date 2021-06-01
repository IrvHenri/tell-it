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

  router.get('/:contribution_id/upvotes', (req, res) => {
    db.query(
      `
      SELECT COUNT(*) FROM upvotes
      WHERE contribution_id = $1
      `,[req.params.contribution_id]
    )
    .then(data => {
      res.json(data.rows[0])
    })
    .catch(err => res.status(400).json({error: err}))
  })


  //Author Accepts Contribution
  router.put('/:contribution_id', (req, res) => {
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
        SET
        is_accepted = CASE
          WHEN (contributions.id = $1 AND contributions.story_id = $2) THEN 'accepted'
          WHEN (contributions.id <> $1 AND contributions.story_id = $2) THEN 'rejected'
          ELSE is_accepted
        END,
        accepted_at = CASE
          WHEN (contributions.id = $1 AND contributions.story_id = $2) THEN NOW()
          ELSE accepted_at
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
      if(data.rows[0]){
        res.status(400).json({error: "Error: User has already upvoted this contribution!"})
      } else {
        //If data.rows[0] is undefined, then no upvote exists. Go ahead and add one.
        db.query(`
        INSERT INTO upvotes (user_id, contribution_id) VALUES ($1, $2) RETURNING *;
        `,[userId, req.params.contribution_id])
        .then(data => {
          res.json(data.rows[0])
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
  })
  return router;
};

# Tell-it!

Tell-it! is a story creator app that is a cross between twitter and reddit. Tell-it! was a midterm project at Lighthouse labs. Contributors were Zoheb Boga & Irving Henriquez.

## Features

 - users can start a story
 - users can add contributions to an existing story
 - users can upvote a contribution
 - users can see upvotes of a contribution
 - the creator of a story can accept a contribution; this merges it to the rest of the story
 - the creator of a story can mark the story complete

### Preview 

### Live Demo ( Tester Profile- Username: Bob & Password: Bob)
 [Tellit-it!](https://quiet-earth-87946.herokuapp.com/)

#### Homepage
<img width="604" alt="tell-it mobile" src="https://user-images.githubusercontent.com/69181038/120903829-6f129100-c616-11eb-9d89-c82d2e116d41.png">


#### Contribute to a Story
<img width="604" alt="tell-it mobile" src="https://user-images.githubusercontent.com/69181038/120903817-5b672a80-c616-11eb-9333-6ffb75c503eb.png">

#### Accept & merge a contribution to the story
<img width="604" alt="tell-it mobile" src="https://user-images.githubusercontent.com/69181038/120903799-3f638900-c616-11eb-9ffd-aa24e6284dee.png">


#### Mark story as complete
<img width="604" alt="tell-it mobile" src="https://user-images.githubusercontent.com/69181038/120903775-222eba80-c616-11eb-8e81-67d55c00670f.png">

#### Mobile view (575px breakpoint)
<img width="304" alt="tell-it mobile" src="https://user-images.githubusercontent.com/69181038/120903753-fc091a80-c615-11eb-8e97-a3ba0dc6f99b.png">

## Tech Stack

- Jquery
- Express
- Node-Postgres
- Sass


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
## Project Setup
<details>
  <summary>Click to expand!</summary>
  
  ## Project Setup

The following steps are only for _one_ of the group members to perform.

1. Create your own copy of this repo using the `Use This Template` button, ideally using the name of your project. The repo should be marked Public
2. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected
3. Clone your copy of the repo to your dev machine
4. Add your team members as collaborators to the project so that they can push to this repo
5. Let your team members know the repo URL so that they use the same repo (they should _not_ create a copy/fork of this repo since that will add additional workflow complexity to the project)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
</details>



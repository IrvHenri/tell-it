// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const storiesRoutes = require("./routes/stories");
const contributionRoutes = require("./routes/contributions");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/stories", storiesRoutes(db));
app.use('/contributions', contributionRoutes(db))
// Note: mount other resources here, using the same pattern above

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

-- Drop and recreate Users table

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_960_720.png'
);

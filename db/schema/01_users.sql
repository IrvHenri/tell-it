DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL DEFAULT 'https://user-images.githubusercontent.com/69181038/120706223-d3064f80-c486-11eb-95f7-1beeb33cabaf.png'
);

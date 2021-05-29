DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  initial_content TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at DATE NOT NULL DEFAULT NOW()
);
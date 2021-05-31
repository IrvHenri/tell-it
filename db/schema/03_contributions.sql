DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_accepted TEXT DEFAULT 'not reviewed',
  created_at DATE NOT NULL DEFAULT NOW(),
  accepted_at DATE
);

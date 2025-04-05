const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    //USER TABLE
    db.run(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);
    //EXPERIENCE TABLE
    db.run(`CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY UNIQUE,
  user_id INTEGER NOT NULL,
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  start_date TEXT, -- Store date in ISO format (YYYY-MM-DD)
  end_date TEXT, -- NULL for current job
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`)
    //SKILLS TABLE
    db.run(`CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY UNIQUE,
  user_id INTEGER NOT NULL,
  skill_name TEXT NOT NULL,
  skill_level TEXT, -- E.g., Beginner, Intermediate, Advanced
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`)
    //EDUCATION TABLE
    db.run(`CREATE TABLE IF NOT EXISTS education (
  id TEXT PRIMARY KEY UNIQUE,
  user_id INTEGER NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  institution TEXT NOT NULL,
  location TEXT,
  start_date TEXT,
  end_date TEXT,
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`)
    //LANGUAGES TABLE
    db.run(`CREATE TABLE IF NOT EXISTS languages (
  id TEXT PRIMARY KEY UNIQUE,
  user_id INTEGER NOT NULL,
  language_name TEXT NOT NULL,
  proficiency_level TEXT, -- E.g., Native, Fluent, Beginner
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`)
});

module.exports = db;
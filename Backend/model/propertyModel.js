db.run(`CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    price REAL,
    client_id INTEGER,
    FOREIGN KEY(client_id) REFERENCES clients(id)
  )`);
  module.exports = db;
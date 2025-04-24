db.run(`CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    property_id INTEGER,
    visit_date TEXT,
    FOREIGN KEY(client_id) REFERENCES clients(id),
    FOREIGN KEY(property_id) REFERENCES properties(id)
  )`);
  module.exports = db;
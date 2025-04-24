const db = require('../model/propertyModel');
exports.getProperties = (req, res) => {
  db.all('SELECT * FROM properties', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addProperty = (req, res) => {
  const { title, description, price, client_id } = req.body;
  db.run('INSERT INTO properties (title, description, price, client_id) VALUES (?, ?, ?, ?)', [title, description, price, client_id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, title });
  });
};
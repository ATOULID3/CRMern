const db = require('../model/clientModel');
exports.getClients = (req, res) => {
  db.all('SELECT * FROM clients', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addClient = (req, res) => {
  const { name, email, phone } = req.body;
  db.run('INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, name, email, phone });
  });
};
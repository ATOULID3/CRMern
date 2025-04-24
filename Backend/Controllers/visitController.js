const db = require('../model/visitModel');
exports.getVisits = (req, res) => {
  db.all('SELECT * FROM visits', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addVisit = (req, res) => {
  const { client_id, property_id, visit_date } = req.body;
  db.run('INSERT INTO visits (client_id, property_id, visit_date) VALUES (?, ?, ?)', [client_id, property_id, visit_date], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID });
  });
};
// 📁 server.js (complete and merged)

// Importing required modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./crm.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      price REAL,
      client_id INTEGER,
      FOREIGN KEY(client_id) REFERENCES clients(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER,
      property_id INTEGER,
      visit_date TEXT,
      FOREIGN KEY(client_id) REFERENCES clients(id),
      FOREIGN KEY(property_id) REFERENCES properties(id)
    )`);

    console.log('Connected to SQLite and tables ready');
  }
});

// JWT middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Authentication routes
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, email });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(403).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret');
    res.status(200).json({ token });
  });
});

// Client routes
app.get('/api/clients', verifyToken, (req, res) => {
  db.all('SELECT * FROM clients', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/clients', verifyToken, (req, res) => {
  const { name, email, phone } = req.body;
  db.run(
    'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, name, email, phone });
    }
  );
});

// Property routes
app.get('/api/properties', verifyToken, (req, res) => {
  db.all('SELECT * FROM properties', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/properties', verifyToken, (req, res) => {
  const { title, description, price, client_id } = req.body;
  db.run(
    'INSERT INTO properties (title, description, price, client_id) VALUES (?, ?, ?, ?)',
    [title, description, price, client_id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, title });
    }
  );
});

// Visit routes
app.get('/api/visits', verifyToken, (req, res) => {
  db.all('SELECT * FROM visits', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/visits', verifyToken, (req, res) => {
  const { client_id, property_id, visit_date } = req.body;
  db.run(
    'INSERT INTO visits (client_id, property_id, visit_date) VALUES (?, ?, ?)',
    [client_id, property_id, visit_date],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});
// Route to get all users (for testing/demo only — don't use in production!)
app.get('/api/users', (req, res) => {
  db.all(`SELECT id, username, email FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.status(200).json(rows);
  });
});

// Protected route to get user details
app.get('/api/user', verifyToken, (req, res) => {
  const email = req.user.email;

  db.get(`SELECT username, email FROM users WHERE email = ?`, [email], (err, user) => {
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the CRM backend API!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

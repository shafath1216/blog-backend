import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Simple test route
app.get('/hello', (req, res) => res.send('Hello world'));

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts LIMIT 5');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Database connection failed');
  }
});

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get post by ID
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  const { title, username, story } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, username, story) VALUES ($1, $2, $3) RETURNING *',
      [title, username, story]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

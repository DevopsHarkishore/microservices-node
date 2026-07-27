const fetch = require('node-fetch');
const express = require('express');

const Video = require('./models/video');
const Book = require('./models/book');

const app = express();

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.get('/', (req, res) => {
  res.json({ msg: 'Search Service' });
});

app.get('/api/v1/search', async (req, res) => {
  try {
    const videosPromise = Video.find({});
    const booksPromise = Book.find({});

    const [videos, books] = await Promise.all([
      videosPromise,
      booksPromise,
    ]);

    res.json(videos.concat(books));

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = app;


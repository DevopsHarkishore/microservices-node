const express = require('express');
const Book = require('./models/book');

const app = express();

// CORS middleware (without using the cors package)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Books Service' });
});

app.get('/api/v1/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/v1/books', async (req, res) => {
  try {
    const book = new Book({
      name: req.body.name,
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;


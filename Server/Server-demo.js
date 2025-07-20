const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let books = []; // אחסון זמני בזיכרון

app.get('/books', (req, res) => {
  res.json(books);
});

// app.post('/books', (req, res) => {
//   const { title } = req.body;
//   const newBook = { id: Date.now(), title };
//   books.push(newBook);
//   res.status(201).json(newBook);
// });

app.post('/books', (req, res) => {
  const { id, title, author, description, price, inStock, discount } = req.body;
  const newBook = { id, title, author, description, price, inStock, discount };
  books.push(newBook);
  res.status(201).json(newBook);
});


app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(book => book.id !== id);
  res.status(204).end();
});

app.listen(4000, () => {
  console.log('📚 Book API running on http://localhost:4000');
});

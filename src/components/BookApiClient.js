import { useState, useEffect } from 'react';
import Book from './Book';
import '../components/Book.css';

function BookApiClient() {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    price: ''
  });

  // טעינה מהשרת
  useEffect(() => {
    fetch('http://localhost:4000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('שגיאה:', err));
  }, []);

  // שינוי טופס
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // הוספת ספר
  const addBook = () => {
    const { title, author, price } = form;
    if (!title || !author || !price) return;

    fetch('http://localhost:4000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(price),
        id: Date.now()
      })
    })
      .then(res => res.json())
      .then(newBook => {
        setBooks([...books, newBook]);
        setForm({ title: '', author: '', description: '', price: '' });
      });
  };

  // מחיקה
  const removeBook = (id) => {
    fetch(`http://localhost:4000/books/${id}`, { method: 'DELETE' })
      .then(() => setBooks(books.filter(book => book.id !== id)));
  };

  return (
    <div>
      <h2>📥 הוספת ספר חדש לשרת</h2>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          name="title"
          placeholder="שם הספר"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="author"
          placeholder="מחבר"
          value={form.author}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="מחיר"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="תיאור"
          value={form.description}
          onChange={handleChange}
        />
        <button onClick={addBook}>➕ הוספה</button>
      </div>

      <h2 style={{ marginTop: '30px' }}>📚 ספרים מהשרת:</h2>
      <div className="book-grid">
        {books.map(book => (
          <div key={book.id}>
            <Book
              title={book.title}
              author={book.author}
              description={book.description}
              price={book.price}
            />
            <button onClick={() => removeBook(book.id)}>❌ מחק</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookApiClient;

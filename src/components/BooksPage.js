import { useState, useEffect } from 'react';
import Book from './Book';
import Rating from './Rating';
import './Book.css';

function BooksPage() {
  const initialBooks = [
    {
      id: 1,
      title: 'war',
      author: 'sary levy',
      description: 'On the war in Israel since the Simchat Torah attack',
      price: 120,
      rating: 0,
      inStock: true,
      discount: 0,
    },
    {
      id: 2,
      title: 'smiles',
      author: 'shiri',
      description: 'To live happily, peacefully and with pleasure',
      price: 95,
      rating: 0,
      inStock: false,
      discount: 0,
    },
    {
      id: 3,
      title: 'good days',
      author: 'Rabbi Kobi Levy',
      description: 'Hope for the best in every difficult moment',
      price: 80,
      rating: 0,
      inStock: true,
      discount: 0,
    },
    {
      id: 4,
      title: 'CSS למעצבים',
      author: 'עדי צור',
      description: 'עיצוב אתרים מודרני',
      price: 100,
      rating: 0,
      inStock: true,
      discount: 40,
    },
  ];

  const [books, setBooks] = useState(initialBooks);
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    inStock: true,
    discount: 0,
  });

  useEffect(() => {
    fetch('http://localhost:4000/books')
      .then(res => res.json())
      .then(data => {
        const booksWithRating = data.map(book => ({
          ...book,
          rating: book.rating || 0,
        }));
        setBooks(prevBooks => [...prevBooks, ...booksWithRating]);
      })
      .catch(err => console.error('שגיאה בטעינת ספרים מהשרת:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: val });
  };

  const addBook = () => {
    const { title, author, price } = form;
    if (!title || !author || !price) return;

    const newBook = {
      ...form,
      price: parseFloat(form.price),
      discount: parseInt(form.discount),
      id: Date.now(),
    };

    fetch('http://localhost:4000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
      .then(res => res.json())
      .then(addedBook => {
        setBooks([...books, { ...addedBook, rating: 0 }]);
        setForm({
          title: '',
          author: '',
          description: '',
          price: '',
          inStock: true,
          discount: 0,
        });
      });
  };

  const removeBook = (id) => {
    fetch(`http://localhost:4000/books/${id}`, { method: 'DELETE' })
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      });
  };

  const handleRate = (title, newRating) => {
    const updated = books.map(book =>
      book.title === title ? { ...book, rating: newRating } : book
    );
    setBooks(updated);
  };

  const topRated = [...books]
    .filter(book => book.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>📚 ספרייה </h1>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <input name="title" placeholder="שם הספר" value={form.title} onChange={handleChange} />
        <input name="author" placeholder="מחבר" value={form.author} onChange={handleChange} />
        <input name="description" placeholder="תיאור" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="מחיר" value={form.price} onChange={handleChange} />
        <input name="discount" type="number" placeholder="הנחה %" value={form.discount} onChange={handleChange} />
        <label>
          <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
          במלאי
        </label>
        <button onClick={addBook}>➕ הוספה</button>
      </div>

      <h2 style={{ textAlign: 'center' }}>📈 3 ספרים עם דירוג הכי גבוה:</h2>
      <ol style={{ textAlign: 'center' }}>
        {topRated.map(book => (
          <li key={book.id}>
            {book.title} – דירוג: {book.rating}
          </li>
        ))}
      </ol>

      <div className="book-grid">
        {books.map(book => (
          <div key={book.id}>
            <Book {...book} />
            <Rating title={book.title} onRate={handleRate} />
            {book.id > 1000 && (
              <button onClick={() => removeBook(book.id)}>❌ מחק</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;

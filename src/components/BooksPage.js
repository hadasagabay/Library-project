import { useState, useEffect } from 'react';
import Book from './Book';
import Rating from './Rating';
import './Book.css';

function BooksPage() {
  const initialBooks = [
    { id: 1, title: 'war', author: 'sary levy', description: 'On the war in Israel since the Simchat Torah attack', price: 120, rating: 0, inStock: true, discount: 55 },
    { id: 2, title: 'smiles', author: 'shiri', description: 'To live happily, peacefully and with pleasure', price: 95, rating: 0, inStock: true, discount: 40 },
    { id: 3, title: 'good days', author: 'Rabbi Kobi Levy', description: 'Hope for the best in every difficult moment', price: 80, rating: 0, inStock: true, discount: 35 },
    { id: 4, title: 'CSS', author: ' צור', description: 'עיצוב אתרים מודרני', price: 100, rating: 0, inStock: true, discount: 40 },
    { id: 5, title: 'מילה במילה', author: ' יענקי', description: 'ספר על החיים אחרי השואה עם הבטחה מאמא', price: 200, rating: 0, inStock: false, discount: 30 },
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
    if (!title.trim() || !author.trim() || !price) {
      alert('אנא מלא/י את השדות חובה: שם, מחבר, מחיר');
      return;
    }

    const newBook = {
      ...form,
      price: parseFloat(form.price),
      discount: parseInt(form.discount) || 0,
      id: Date.now(),
      rating: 0,
    };

    // אם את משתמשת בשרת, כאן יש את קריאת ה-POST:
    // fetch('http://localhost:4000/books', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newBook),
    // })
    //   .then(res => res.json())
    //   .then(addedBook => {
    //     setBooks([...books, addedBook]);
    //     resetForm();
    //   });

    // בינתיים נוסיף ישירות למערך (ללא קריאה לשרת):
    setBooks([...books, newBook]);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      title: '',
      author: '',
      description: '',
      price: '',
      inStock: true,
      discount: 0,
    });
  };

  const removeBook = (id) => {
    fetch(`http://localhost:4000/books/${id}`, { method: 'DELETE' })
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      });
  };

  const handleRate = (title, newRating) => {
    const updatedBooks = books.map(book =>
      book.title === title ? { ...book, rating: newRating } : book
    );
    setBooks(updatedBooks);
  };

  const topRated = [...books]
    .filter(book => book.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>📚 ספרייה </h1>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* אזור רשימת דירוג בצד ימין */}
        <div style={{
          width: '20%',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '15px',
          backgroundColor: '#fafafa',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
          height: 'fit-content',
          position: 'sticky',
          top: '20px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>⭐ דירוג מוביל</h2>
          <ol style={{ paddingLeft: '20px' }}>
            {topRated.length > 0 ? topRated.map(book => (
              <li key={book.id} style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                {book.title} –  {book.rating}
              </li>
            )) : <p>עדיין אין דירוגים</p>}
          </ol>
        </div>

        {/* טופס הוספת ספר */}
        <div style={{
          width: '25%',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '15px',
          backgroundColor: '#fff',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
          height: 'fit-content',
          position: 'sticky',
          top: '20px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>➕ הוספת ספר חדש</h2>
          <input
            style={inputStyle}
            name="title"
            placeholder="שם הספר"
            value={form.title}
            onChange={handleChange}
          />
          <input
            style={inputStyle}
            name="author"
            placeholder="מחבר"
            value={form.author}
            onChange={handleChange}
          />
          <input
            style={inputStyle}
            name="description"
            placeholder="תיאור"
            value={form.description}
            onChange={handleChange}
          />
          <input
            style={inputStyle}
            type="number"
            name="price"
            placeholder="מחיר"
            value={form.price}
            onChange={handleChange}
          />
          <input
            style={inputStyle}
            type="number"
            name="discount"
            placeholder="הנחה %"
            value={form.discount}
            onChange={handleChange}
          />
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
              style={{ marginRight: '8px' }}
            />
            במלאי
          </label>
          <button
            onClick={addBook}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            הוסף ספר
          </button>
        </div>

        {/* אזור רשימת הספרים */}
        <div style={{
          flexGrow: 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}>
          {books.map(book => (
            <div key={book.id} style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              maxWidth: '350px',
              boxShadow: '0 3px 7px rgba(0,0,0,0.1)',
              background: '#fff',
              flexGrow: 1,
              flexBasis: '300px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Book {...book} />
              <Rating title={book.title} currentRating={book.rating} onRate={handleRate} />
              {book.id > 1000 && (
                <button
                  onClick={() => removeBook(book.id)}
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#e53935',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  ❌ מחק ספר
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  marginBottom: '10px',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

export default BooksPage;

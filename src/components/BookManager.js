import { useState } from 'react';
import Book from './Book';

function BookManager() {
  const [books, setBooks] = useState([
    { id: 1, title: 'React Basics', price: 90, inStock: true },
  ]);

  const addBook = () => {
    const id = books.length + 1;
    const newBook = {
      id,
      title: `New Book ${id}`,
      price: 100 + id * 10,
      inStock: true
    };

    setBooks([...books, newBook]);
  };

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div>
      <h2>ניהול ספרים</h2>
      <button onClick={addBook}>➕ הוסף ספר</button>

      {books.map(book => (
        <div key={book.id}>
          <Book {...book} />
          <button onClick={() => removeBook(book.id)}>❌ הסר</button>
        </div>
      ))}
    </div>
  );
}

export default BookManager;

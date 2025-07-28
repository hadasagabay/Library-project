// src/components/AddBook.js
import React, { useState } from 'react';

function AddBook({ onAdd }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // בדיקה בסיסית שכל השדות מולאו
    if (!title || !author || !category || rating < 0 || rating > 5) {
      alert('נא למלא את כל השדות ולהזין דירוג בין 0 ל־5');
      return;
    }

    const newBook = {
      id: Date.now(), // יצירת מזהה ייחודי
      title,
      author,
      category,
      rating,
    };

    onAdd(newBook); // שליחה להורה
    setTitle('');
    setAuthor('');
    setCategory('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow bg-gray-100">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        className="w-full p-2 border rounded"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        className="w-full p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating (0–5)"
        className="w-full p-2 border rounded"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="0"
        max="5"
        step="0.1"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Book
      </button>
    </form>
  );
}

export default AddBook;

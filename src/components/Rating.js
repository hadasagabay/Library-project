import { useState } from 'react';

function Rating({ title, onRate }) {
  const [rating, setRating] = useState(0);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setRating(value);
    onRate(title, value);
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <h3>{title}</h3>
      <label>דירוג (1-5): </label>
      <select value={rating} onChange={handleChange}>
        <option value={0}>בחר דירוג</option>
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </div>
  );
}

export default Rating;
import { useState } from 'react';


function Book({ title, author, description, price, inStock, discount }) {
  const [isPurchased, setIsPurchased] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [inList, setInList] = useState(false);

  const togglePurchase = () => setIsPurchased(!isPurchased);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const toggleDetails = () => setShowDetails(!showDetails);
  const addToList = () => setInList(true);
  const removeFromList = () => setInList(false);

  // תנאים לעיצוב:
  const isOnSale = discount >= 30;
  const cardClass = `
    book-card 
    ${isPurchased ? 'purchased' : ''} 
    ${!inStock ? 'out-of-stock' : ''}
    ${isOnSale ? 'on-sale' : ''}
  `;

  return (
    <div className={cardClass}>
      <h2>{title}</h2>
      <p>מאת: {author}</p>
      <p>מחיר: ₪{price}</p>
      {discount ? <p>הנחה: {discount}%</p> : null}

      {showDetails && (
        <div className="book-details">
          <strong>תיאור:</strong> {description}
        </div>
      )}

      <div className="book-actions">
        {inStock && (
          <button onClick={togglePurchase}>
            {isPurchased ? 'Cancel a purchase' : '✔️ acquired'}
          </button>
        )}
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide details' : 'show details'}
        </button>
        <button onClick={increaseQuantity}>📚 amount: {quantity}</button>
      </div>

      <div className="book-list-actions">
        {!inList ? (
          <button className="add" onClick={addToList}>
            ➕ Add to list
          </button>
        ) : (
          <button className="remove" onClick={removeFromList}>
            ❌ Remove from list
          </button>
        )}
      </div>
    </div>
  );
}

export default Book;

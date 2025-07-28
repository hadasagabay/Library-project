import { useState } from 'react';

function Book({ title, author, description, price, inStock, discount }) {
  const [isPurchased, setIsPurchased] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [inList, setInList] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const togglePurchase = () => {
    const total = quantity * (discount ? price - (price * discount / 100) : price);
    setIsPurchased(!isPurchased);
    setCartTotal(!isPurchased ? cartTotal + total : cartTotal - total);
  };

  const increaseQuantity = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    if (isPurchased) {
      const pricePerBook = discount ? price - (price * discount / 100) : price;
      setCartTotal(cartTotal + pricePerBook);
    }
  };

  const toggleDetails = () => setShowDetails(!showDetails);
  const addToList = () => setInList(true);
  const removeFromList = () => setInList(false);

  const clearCart = () => {
    setCartTotal(0);
    setIsPurchased(false);
    setQuantity(1);
  };

  const isOnSale = discount >= 30;
  const discountedPrice = discount ? price - (price * discount / 100) : price;

  const cardClass = `
    book-card 
    ${isPurchased ? 'purchased' : ''} 
    ${!inStock ? 'out-of-stock' : ''}
    ${isOnSale ? 'on-sale' : ''}
  `;

  return (
    <div className={cardClass}>
      <h2>{title}</h2>
      <p>מאת: {author || 'לא ידוע'}</p>

      {discount ? (
        <>
          <p style={{ textDecoration: 'line-through', color: 'gray' }}>
            מחיר רגיל: ₪{price}
          </p>
          <p style={{ fontWeight: 'bold', color: 'green' }}>
            מחיר אחרי הנחה: ₪{discountedPrice.toFixed(2)}
          </p>
          <p>הנחה: {discount}%</p>
        </>
      ) : (
        <p>מחיר: ₪{price}</p>
      )}

      {showDetails && (
        <div className="book-details">
          <strong>תיאור:</strong> {description || 'אין תיאור זמין'}
        </div>
      )}

      <div className="book-actions">
        {inStock && (
          <button onClick={togglePurchase}>
            {isPurchased ? '❌ ביטול רכישה' : '✔️ הוספה לקופה'}
          </button>
        )}
        <button onClick={toggleDetails}>
          {showDetails ? 'הסתר פרטים' : 'הצג פרטים'}
        </button>
        <button onClick={increaseQuantity}>📚 כמות: {quantity}</button>
      </div>

      {/* <div className="book-list-actions">
        {!inList ? (
          <button className="add" onClick={addToList}>
            ➕ הוסף לרשימה
          </button>
        ) : (
          <button className="remove" onClick={removeFromList}>
            ❌ הסר מהרשימה
          </button>
        )}
      </div> */}

      <hr />
      <div style={{ marginTop: '10px' }}>
        <p><strong>💰 סך הכל בקופה:</strong> ₪{cartTotal.toFixed(2)}</p>
        <button onClick={clearCart} style={{ background: '#e53935', color: 'white', padding: '6px 10px', borderRadius: '6px', border: 'none' }}>
          🗑️ רוקן קופה
        </button>
      </div>
    </div>
  );
}

export default Book;

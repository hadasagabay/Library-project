import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', color: 'red' }}>
      <h2>404 – הדף לא נמצא 😢</h2>
      <Link to="/">🔙 חזרה לדף הבית</Link>
    </div>
  );
}

export default NotFound;
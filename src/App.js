// import Book from './components/Book';

// function App() {
//   return (
//     <div style={{ padding: '30px', fontFamily: 'Arial' }}>
//       <h1 style={{ textAlign: 'center' }}>📚 רשימת הספרים</h1>

//       <Book
//         title="war"
//         author="sary levy"
//         description="On the war in Israel since the Simchat Torah attack"
//         price={120}
//       />

//       <Book
//         title="smiles"
//         author="shiri"
//         description="To live happily, peacefully and with pleasure"
//         price={95}
//       />

//       <Book
//         title="good days"
//         author="Rabbi Kobi Levy"
//         description="Hope for the best in every difficult moment"
//         price={80}
//       />
//     </div>
//   );
// }

// export default App;
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import BooksPage from './components/BooksPage';
import NotFound from './components/NotFound';


function App() {
  return (
    <>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '10px' }}> דף הבית 🏠</Link>
        <Link to="/books">📚 ספרים </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

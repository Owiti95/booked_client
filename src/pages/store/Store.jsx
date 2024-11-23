// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./store.css";

// const StoreBookList = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:5000/user/store_books");
//         setBooks(response.data);
//         setFilteredBooks(response.data);
//       } catch (err) {
//         setError("Failed to load books.");
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleSearch = () => {
//     const filtered = books.filter(
//       (book) =>
//         book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         book.genre.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredBooks(filtered);
//   };

//   const addToCart = async (bookId) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("You must be logged in to add items to the cart.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/user/add_to_cart",
//         { book_id: bookId, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSuccessMessage(response.data.message);
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (err) {
//       setError("Failed to add item to cart.");
//     }
//   };

//   return (
//     <div className="store-book-list">
//       {error && <p className="error-message">{error}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <h1 className="page-title">Bookstore</h1>

//       <div className="search-form">
//         <input
//           type="text"
//           placeholder="Search books by title or genre"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="search-input"
//         />
//         <button onClick={handleSearch} className="search-button">
//           Search
//         </button>
//       </div>

//       <div className="book-cards-container">
//         {filteredBooks.map((book) => (
//           <div className="book-card" key={book.id}>
//             {book.image_url && (
//               <img
//                 src={book.image_url}
//                 alt={book.title}
//                 className="book-image"
//               />
//             )}
//             <h2 className="book-title">{book.title}</h2>
//             <p className="book-author">Author: {book.author}</p>
//             <p className="book-genre">Genre: {book.genre}</p>
//             <p className="book-price">Price: ${book.price.toFixed(2)}</p>
//             <div className="book-buttons">
//               <Link to={`/store_books/${book.id}`} className="view-details-button">
//                 View Details
//               </Link>
//               <button
//                 onClick={() => addToCart(book.id)}
//                 className="add-to-cart-button"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StoreBookList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./store.css";

const StoreBookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [dateSort, setDateSort] = useState(""); // "asc" or "desc"
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/user/store_books");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (err) {
        setError("Failed to load books.");
      }
    };

    fetchBooks();
  }, []);

  // Filter books by search query, genre, price, and sort by date
  const filterBooks = () => {
    let filtered = books;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by genre
    if (genreFilter) {
      filtered = filtered.filter((book) => book.genre.toLowerCase() === genreFilter.toLowerCase());
    }

    // Filter by price range
    filtered = filtered.filter((book) => book.price >= priceRange[0] && book.price <= priceRange[1]);

    // Sort by date uploaded
    if (dateSort === "asc") {
      filtered = filtered.sort((a, b) => new Date(a.date_uploaded) - new Date(b.date_uploaded));
    } else if (dateSort === "desc") {
      filtered = filtered.sort((a, b) => new Date(b.date_uploaded) - new Date(a.date_uploaded));
    }

    setFilteredBooks(filtered);
  };

  // Add book to cart
  const addToCart = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/user/add_to_cart",
        { book_id: bookId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to add item to cart.");
    }
  };

  return (
    <div className="store-book-list">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <h1 className="page-title">Bookstore</h1>

      <div className="filter-form">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search books by title or genre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {/* Genre Filter */}
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="genre-filter"
        >
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          {/* Add more genres as needed */}
        </select>

        {/* Price Range Filter */}
        <div className="price-range">
          <label>
            Min Price:
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="price-input"
            />
          </label>
          <label>
            Max Price:
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="price-input"
            />
          </label>
        </div>

        {/* Date Sort */}
        <select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          className="date-sort"
        >
          <option value="">Sort by Date</option>
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>

        {/* Apply Filters Button */}
        <button onClick={filterBooks} className="apply-filters-button">
          Apply Filters
        </button>
      </div>

      {/* Book Cards */}
      <div className="book-cards-container">
        {filteredBooks.map((book) => (
          <div className="book-card" key={book.id}>
            {book.image_url && (
              <img
                src={book.image_url}
                alt={book.title}
                className="book-image"
              />
            )}
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">Author: {book.author}</p>
            <p className="book-genre">Genre: {book.genre}</p>
            <p className="book-price">Price: ${book.price.toFixed(2)}</p>
            <p className="book-date">
              Uploaded on: {new Date(book.date_uploaded).toLocaleDateString()}
            </p>
            <div className="book-buttons">
              <Link to={`/store_books/${book.id}`} className="view-details-button">
                View Details
              </Link>
              <button
                onClick={() => addToCart(book.id)}
                className="add-to-cart-button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreBookList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "../index.css";

const StoreBookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSearch = () => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

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

      <div className="search-form">
        <input
          type="text"
          placeholder="Search books by title or genre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

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

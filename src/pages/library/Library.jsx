import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/user/library_books", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
          },
        });
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please log in to view library books.");
        } else {
          setError("Failed to load library books. Please try again later.");
        }
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

  const handleBorrowBook = async (bookId) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/user/borrow_book",
        { book_id: bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
          },
        }
      );
      alert("Book borrowed successfully!");
      console.log(response.data);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("The selected book is not available for borrowing.");
      } else {
        setError("Failed to borrow the book. Please try again later.");
      }
    }
  };

  return (
    <div className="library-book-list">
      {error && <p className="error-message">{error}</p>}
      <h1 className="page-title">
        <i>Library Books</i>
      </h1>

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
            <p className="book-copies">
              Available Copies: {book.available_copies}
            </p>
            <div className="book-buttons">
              <Link to={`/details/:${book.id}`} className="view-details-button">
                View Details
              </Link>
              <button
                onClick={() => handleBorrowBook(book.id)}
                className="borrow-book-button"
              >
                Borrow Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;

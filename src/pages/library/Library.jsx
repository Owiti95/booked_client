import React, { useEffect, useState } from "react";
import BookCard from "../../components/book_card/BookCard";
import axios from "axios";
import { Link } from "react-router-dom";
// Library
const Library = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://booked-backend.onrender.com/user/library_books", {
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
        "https://booked-backend.onrender.com/user/borrow_book",
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
    <div className="book-list">
      {error && <p className="error-message">{error}</p>}
      <h1 className="heading-secondary">
        Library Books
      </h1>

      <div className="booked_create-event_form">
        <div className="booked_input-container">
        <input
          type="text"
          placeholder="Search books by title or genre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        </div>
        <button onClick={handleSearch} className="btn">
          Search
        </button>
      </div>

      <div className="book-cards-container">
        {filteredBooks.map((book) => (
          <div key={book.id}>
            <BookCard image_url={book.image_url} title={book.title} author={book.author} genre={book.genre} book_id={book.id} onAddToCart={handleBorrowBook} addText="Borrow Book" isLibrary={true} available_copies={book.available_copies}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;

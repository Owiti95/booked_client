import React, { useEffect, useState } from "react";
import BookCard from "../../components/book_card/BookCard";
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
        const response = await axios.get("https://booked-backend.onrender.com/user/store_books");
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
        "https://booked-backend.onrender.com/user/add_to_cart",
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
    <section className="book-list">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <h1 className="heading-secondary">Bookstore</h1>

      <div className="booked_create-event_form">
        {/* Search Input */}
        <div className="booked_input-container">
        <input
          type="text"
          placeholder="Search books by title or genre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        </div>

        {/* Genre Filter */}
        <div className="booked_input-container">
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
        </div>

        {/* Price Range Filter */}
        <div className="price-range">
          <div className="booked_input-container">
          <label for="min_price">Min Price:</label>
          <input
            id="min_price"
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="price-input"
          />
          </div>
          
          <div className="booked_input-container">
          <label for="max_price">Max Price:</label>
            <input
            id="max_price"
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="price-input"
            />
            </div>
        </div>

        {/* Date Sort */}
        <div className="booked_input-container">
        <select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          className="date-sort"
        >
          <option value="">Sort by Date</option>
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>
        </div>

        {/* Apply Filters Button */}
        <button onClick={filterBooks} className="btn">
          Apply Filters
        </button>
      </div>

      <div className="book-cards-container">
      {/* Book Cards */}
        {filteredBooks.map((book) => (
          <div key={book.id}>
            <BookCard image_url={book.image_url} title={book.title} author={book.author} genre={book.genre} price={book.price} book_id={book.id} onAddToCart={addToCart} addText="Add to Cart" isStore={true}/>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreBookList;

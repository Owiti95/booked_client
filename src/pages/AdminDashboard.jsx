import React, { useState, useEffect } from "react";
import axios from "axios";
import StoreDeleteEdit from "../components/StoreDeleteEdit";
import CreateEvent from "../components/CreateStoreBook";
import "../index.css";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    price: 0,
    stock: 0,
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/view_books", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to load books", error.response?.data || error.message);
      }
    };

    fetchBooks();
  }, []);

  // Create or Update Book Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newBook).forEach((key) => formData.append(key, newBook[key]));

    try {
      if (isEditing) {
        // Update book
        const response = await axios.put(
          `http://localhost:5000/admin/store_books/${editingBookId}`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        const updatedBooks = books.map((book) =>
          book.id === editingBookId ? response.data : book
        );
        setBooks(updatedBooks);
      } else {
        // Create new book
        const response = await axios.post(
          "http://localhost:5000/admin/store_books",
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setBooks([...books, response.data]);
      }

      // Reset form
      setNewBook({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        price: 0,
        stock: 0,
        image: null,
      });
      setIsEditing(false);
      setEditingBookId(null);
    } catch (error) {
      console.error("Failed to save book", error.response?.data || error.message);
    }
  };

  // Edit Book Handler
  const handleEditBook = (book) => {
    setIsEditing(true);
    setEditingBookId(book.id);
    setNewBook({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      price: book.price,
      stock: book.stock,
      image: null, // Images cannot be pre-filled in file inputs
    });
  };

  // Delete Book Handler
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/store_books/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Failed to delete book", error.response?.data || error.message);
    }
  };

  // Handle form input changes for the new book
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  // Handle image file input
  const handleFileChange = (e) => {
    setNewBook({
      ...newBook,
      image: e.target.files[0],
    });
  };

  return (
    <div className="admin-dashboard">
      <h1 className="page-title">Admin Dashboard</h1>

      <div className="create-book-section">
        <CreateEvent
          onSubmit={handleFormSubmit}
          newEvent={newBook}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          isEditing={isEditing}
        />
      </div>

      <StoreDeleteEdit
        events={books}
        onEditEvent={handleEditBook}
        onDeleteEvent={handleDeleteBook}
      />
    </div>
  );
};

export default AdminDashboard;

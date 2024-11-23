import { useState, useEffect } from "react";
import axios from "axios";

const useBookManagement = () => {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newBook).forEach((key) => formData.append(key, newBook[key]));

    try {
      if (isEditing) {
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
        const response = await axios.post(
          "http://localhost:5000/admin/store_books",
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setBooks([...books, response.data]);
      }

      resetForm();
    } catch (error) {
      console.error("Failed to save book", error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewBook({ ...newBook, image: e.target.files[0] });
  };

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
      image: null,
    });
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/store_books/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Failed to delete book", error.response?.data || error.message);
    }
  };

  const resetForm = () => {
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
  };

  return {
    books,
    newBook,
    isEditing,
    handleFormSubmit,
    handleInputChange,
    handleFileChange,
    handleEditBook,
    handleDeleteBook,
  };
};

export default useBookManagement;

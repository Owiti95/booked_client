import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./cart_borrowed.css";

const CartBorrowed = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch borrowings
  useEffect(() => {
    const fetchBorrowings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view your borrowings.');
        return;
      }

      try {
        const response = await axios.get('https://booked-backend.onrender.com/user/borrowings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowings(response.data);
      } catch (err) {
        setError('Failed to load borrowings.');
      }
    };

    fetchBorrowings();
  }, []);

  // Remove a book from borrowings
  const removeBorrowing = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('https://booked-backend.onrender.com/user/remove_from_borrowings', {
        headers: { Authorization: `Bearer ${token}` },
        data: { book_id: bookId },
      });
      setSuccessMessage('Book removed from borrowings successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
      setBorrowings((prevItems) =>
        prevItems.filter((item) => item.book_id !== bookId)
      );
    } catch (err) {
      setError('Failed to remove book from borrowings.');
    }
  };

  return (
    <div className="borrowings-cart">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <h1>Your Borrowings</h1>
      {borrowings.length === 0 ? (
        <p>You have no borrowings at the moment.</p>
      ) : (
        <table className="borrowings-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Borrowed On</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map((item) => (
              <tr key={item.id}>
                <td>{item.book.title}</td>
                <td>{new Date(item.date_borrowed).toLocaleDateString()}</td>
                <td>{new Date(item.due_date).toLocaleDateString()}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() => removeBorrowing(item.book_id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartBorrowed;

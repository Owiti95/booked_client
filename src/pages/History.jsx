import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import "./borrowings.css";

const History = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all borrowings
  useEffect(() => {
    const fetchBorrowings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view your borrowings.');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:5000/user/all_borrowings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowings(response.data);
      } catch (err) {
        setError('Failed to load borrowings.');
      }
    };

    fetchBorrowings();
  }, []);

  // Initiate a return request
  const initiateReturn = async (borrowingId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/user/initiate_return',
        { borrowing_id: borrowingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Return request initiated successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);

      // Update the borrowing list to reflect the new status
      setBorrowings((prevItems) =>
        prevItems.map((item) =>
          item.id === borrowingId ? { ...item, status: 'Return Initiated' } : item
        )
      );
    } catch (err) {
      setError('Failed to initiate return request.');
    }
  };

  return (
    <div className="borrowings-page">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <h1>Your Borrowing History</h1>
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
                  {item.status === 'Approved' && (
                    <button
                      onClick={() => initiateReturn(item.id)}
                      className="return-button"
                    >
                      Initiate Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;

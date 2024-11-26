import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReturnRequests = () => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch return requests
  useEffect(() => {
    axios
      .get('https://booked-backend.onrender.com/admin/return_requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setReturnRequests(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch return requests.');
        setLoading(false);
      });
  }, []);

  // Confirm return
  const handleConfirmReturn = (borrowingId) => {
    axios
      .patch(
        'https://booked-backend.onrender.com/admin/confirm_return',
        { borrowing_id: borrowingId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        setReturnRequests((prevRequests) =>
          prevRequests.filter((req) => req.id !== borrowingId)
        );
        alert(response.data.message);
      })
      .catch((err) => {
        alert('Failed to confirm the return.');
      });
  };

  if (loading) return <p>Loading return requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Return Requests</h1>
      {returnRequests.length === 0 ? (
        <p>No return requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Borrowing ID</th>
              <th>Book Title</th>
              <th>User</th>
              <th>Date Borrowed</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {returnRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.book.title}</td>
                <td>{request.user.name}</td>
                <td>{new Date(request.date_borrowed).toLocaleDateString()}</td>
                <td>{new Date(request.due_date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleConfirmReturn(request.id)}
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    Confirm Return
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

export default AdminReturnRequests;

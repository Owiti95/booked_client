import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [sales, setSales] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number
  const [currentSaleId, setCurrentSaleId] = useState(null); // State to track the current sale for payment

  // Fetch borrowings
  useEffect(() => {
    const fetchBorrowings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view your history.');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:5000/user/all_borrowings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowings(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load borrowing history.');
      }
    };

    fetchBorrowings();
  }, []);

  // Fetch sales
  useEffect(() => {
    const fetchSalesHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view your history.');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:5000/user/sales_history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSales(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load sales history.');
      }
    };

    fetchSalesHistory();
  }, []);

  // Initiate return request
  const initiateReturn = async (borrowingId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://127.0.0.1:5000/user/initiate_return',
        { borrowing_id: borrowingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Return request initiated successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);

      setBorrowings((prevItems) =>
        prevItems.map((item) =>
          item.id === borrowingId ? { ...item, status: 'Return Initiated' } : item
        )
      );
    } catch (err) {
      setError('Failed to initiate return request.');
    }
  };

  // Handle payment
  const handlePayment = async () => {
    const token = localStorage.getItem('token');
    if (!phoneNumber) {
      setError('Please enter your phone number.');
      return;
    }

    try {
      const sale = sales.find((sale) => sale.id === currentSaleId);
      const response = await axios.post(
        'http://127.0.0.1:5000/user/buyGoods',
        { amount: sale.total_price, phone_number: phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.ResponseCode === '0') {
        setSuccessMessage('Payment initiated successfully. Check your phone to complete.');
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setError('Failed to initiate payment.');
      }
    } catch (err) {
      setError('Error during payment processing.');
    }
  };

  return (
    <div className="history-page">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <h1>Your History</h1>

      <section className="borrowings-section">
        <h2>Borrowing History</h2>
        {borrowings.length === 0 ? (
          <p>No borrowings at the moment.</p>
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
      </section>

      <section className="sales-section">
        <h2>Sales History</h2>
        {sales.length === 0 ? (
          <p>No sales history available at the moment.</p>
        ) : (
          <div>
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Date of Sale</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.book?.title || 'N/A'}</td>
                    <td>{new Date(sale.date_of_sale).toLocaleDateString()}</td>
                    <td>{sale.quantity}</td>
                    <td>${sale.total_price.toFixed(2)}</td>
                    <td>{sale.status}</td>
                    <td>
                      {sale.status === 'Approved' && (
                        <button
                          onClick={() => setCurrentSaleId(sale.id)}
                          className="pay-button"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {currentSaleId && (
              <div className="payment-section">
                <label>
                  Enter Phone Number:
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </label>
                <button onClick={handlePayment} className="confirm-payment-button">
                  Confirm Payment
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default History;

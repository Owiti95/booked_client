import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view your cart.');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:5000/user/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
      } catch (err) {
        setError('Failed to load cart items.');
      }
    };

    fetchCartItems();
  }, []);

  // Update quantity of an item in the cart
  const updateQuantity = async (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(bookId);
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/user/add_to_cart',
        { book_id: bookId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(''), 3000);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.book_id === bookId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setError('Failed to update item quantity.');
    }
  };

  // Remove an item from the cart
  const removeItem = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('http://127.0.0.1:5000/user/remove_from_cart', {
        headers: { Authorization: `Bearer ${token}` },
        data: { book_id: bookId },
      });
      setSuccessMessage('Item removed from cart successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.book_id !== bookId)
      );
    } catch (err) {
      setError('Failed to remove item from cart.');
    }
  };

  // Checkout the cart items
  const checkout = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/user/checkout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Checkout successful!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setCartItems([]); // Clear cart after checkout
    } catch (err) {
      setError('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="cart-page">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.book_id}>
                <td>{item.book.title}</td>
                <td>${item.book.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.book_id, parseInt(e.target.value))
                    }
                    min="1"
                  />
                </td>
                <td>${(item.book.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => removeItem(item.book_id)}
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
      <div className="checkout">
        <button onClick={checkout} disabled={cartItems.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartCheckout;

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import "./cart_borrowed.css";

// // const CartBorrowed = () => {
// //   const [borrowings, setBorrowings] = useState([]);
// //   const [error, setError] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');

// //   // Fetch borrowings
// //   useEffect(() => {
// //     const fetchBorrowings = async () => {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         setError('You must be logged in to view your borrowings.');
// //         return;
// //       }

// //       try {
// //         const response = await axios.get('http://127.0.0.1:5000/user/borrowings', {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setBorrowings(response.data);
// //       } catch (err) {
// //         setError('Failed to load borrowings.');
// //       }
// //     };

// //     fetchBorrowings();
// //   }, []);

// //   // Approve a borrowing request
// //   const approveBorrowing = async (borrowingId) => {
// //     const token = localStorage.getItem('token');
// //     try {
// //       const response = await axios.patch(
// //         'http://127.0.0.1:5000/user/approve_borrowing',
// //         { borrowing_id: borrowingId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       setSuccessMessage('Borrowing request approved successfully.');
// //       setTimeout(() => setSuccessMessage(''), 3000);

// //       // Update the borrowing list to reflect the new status
// //       setBorrowings((prevItems) =>
// //         prevItems.map((item) =>
// //           item.id === borrowingId ? { ...item, status: 'Approved' } : item
// //         )
// //       );
// //     } catch (err) {
// //       setError('Failed to approve borrowing request.');
// //     }
// //   };

// //   // Remove a book from borrowings
// //   const removeBorrowing = async (bookId) => {
// //     const token = localStorage.getItem('token');
// //     try {
// //       await axios.delete('http://127.0.0.1:5000/user/remove_from_borrowings', {
// //         headers: { Authorization: `Bearer ${token}` },
// //         data: { book_id: bookId },
// //       });
// //       setSuccessMessage('Book removed from borrowings successfully.');
// //       setTimeout(() => setSuccessMessage(''), 3000);
// //       setBorrowings((prevItems) =>
// //         prevItems.filter((item) => item.book_id !== bookId)
// //       );
// //     } catch (err) {
// //       setError('Failed to remove book from borrowings.');
// //     }
// //   };

// //   return (
// //     <div className="borrowings-cart">
// //       {error && <p className="error-message">{error}</p>}
// //       {successMessage && <p className="success-message">{successMessage}</p>}
// //       <h1>Your Borrowings</h1>
// //       {borrowings.length === 0 ? (
// //         <p>You have no borrowings at the moment.</p>
// //       ) : (
// //         <table className="borrowings-table">
// //           <thead>
// //             <tr>
// //               <th>Title</th>
// //               <th>Borrowed On</th>
// //               <th>Due Date</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {borrowings.map((item) => (
// //               <tr key={item.id}>
// //                 <td>{item.book.title}</td>
// //                 <td>{new Date(item.date_borrowed).toLocaleDateString()}</td>
// //                 <td>{new Date(item.due_date).toLocaleDateString()}</td>
// //                 <td>{item.status}</td>
// //                 <td>
// //                 <button
// //                     onClick={() => removeBorrowing(item.book_id)}
// //                     className="remove-button"
// //                 >
// //                     Remove
// //                 </button>
// //                 </td>

// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default CartBorrowed;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./cart_borrowed.css";

// const CartBorrowed = () => {
//   const [borrowings, setBorrowings] = useState([]);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Fetch borrowings
//   useEffect(() => {
//     const fetchBorrowings = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('You must be logged in to view your borrowings.');
//         return;
//       }

//       try {
//         const response = await axios.get('http://127.0.0.1:5000/user/borrowings', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBorrowings(response.data);
//       } catch (err) {
//         setError('Failed to load borrowings.');
//       }
//     };

//     fetchBorrowings();
//   }, []);

//   // Remove a book from borrowings
//   const removeBorrowing = async (bookId) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete('http://127.0.0.1:5000/user/remove_from_borrowings', {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { book_id: bookId },
//       });
//       setSuccessMessage('Book removed from borrowings successfully.');
//       setTimeout(() => setSuccessMessage(''), 3000);
//       setBorrowings((prevItems) =>
//         prevItems.filter((item) => item.book_id !== bookId)
//       );
//     } catch (err) {
//       setError('Failed to remove book from borrowings.');
//     }
//   };

//   return (
//     <div className="borrowings-cart">
//       {error && <p className="error-message">{error}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <h1>Your Borrowings</h1>
//       {borrowings.length === 0 ? (
//         <p>You have no borrowings at the moment.</p>
//       ) : (
//         <table className="borrowings-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Borrowed On</th>
//               <th>Due Date</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {borrowings.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.book.title}</td>
//                 <td>{new Date(item.date_borrowed).toLocaleDateString()}</td>
//                 <td>{new Date(item.due_date).toLocaleDateString()}</td>
//                 <td>{item.status}</td>
//                 <td>
//                   {item.status === 'Pending' && (
//                     <button
//                       onClick={() => removeBorrowing(item.book_id)}
//                       className="remove-button"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CartBorrowed;
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
        const response = await axios.get('http://127.0.0.1:5000/user/borrowings', {
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
      await axios.delete('http://127.0.0.1:5000/user/remove_from_borrowings', {
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

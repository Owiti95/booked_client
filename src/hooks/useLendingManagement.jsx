import { useState, useEffect } from "react";
import axios from "axios";

const useLendingManagement = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all lending requests
  useEffect(() => {
    const fetchBorrowings = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://booked-backend.onrender.com/admin/borrowings", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBorrowings(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load lending requests");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  // Approve or reject a specific lending request
  const handleLendingAction = async (id, action) => {
    try {
      const response = await axios.post(
        "https://booked-backend.onrender.com/admin/approve_lending/${id}",
        { action },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setBorrowings((prevBorrowings) =>
        prevBorrowings.map((borrowing) =>
          borrowing.id === id
            ? { ...borrowing, status: response.data.borrowing.status }
            : borrowing
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${action} lending request`);
    }
  };

  return {
    borrowings,
    loading,
    error,
    handleLendingAction,
  };
};

export default useLendingManagement;

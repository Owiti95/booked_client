import { useState, useEffect } from "react";
import axios from "axios";

const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://booked-backend.onrender.com/admin/orders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleApproveOrder = async (id, action) => {
    try {
      const response = await axios.post(
        "https://booked-backend.onrender.com/admin/approve_order/${id}",
        { action },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: response.data.order.status } : order
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update order");
    }
  };

  return { orders, loading, error, handleApproveOrder };
};

export default useOrderManagement;

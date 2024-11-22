import React from "react";
import CreateEvent from "../components/CreateStoreBook";
import StoreDeleteEdit from "../components/StoreDeleteEdit";
import OrderManagement from "../components/OrderManagement";
import LibraryDashboard from "./LibraryDashboard";
import useBookManagement from "../hooks/useBookManagement";
import useOrderManagement from "../hooks/useOrderManagement";
import "../index.css";

const AdminDashboard = () => {
  const {
    books,
    newBook,
    isEditing,
    handleFormSubmit,
    handleInputChange,
    handleFileChange,
    handleEditBook,
    handleDeleteBook,
  } = useBookManagement();

  const { orders, loading, error, handleApproveOrder } = useOrderManagement();

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

      <div className="order-management-section">
        <h2>Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <OrderManagement orders={orders} onApproveOrder={handleApproveOrder} />
        )}
      </div>
      <LibraryDashboard />
    </div>
  );
};

export default AdminDashboard;

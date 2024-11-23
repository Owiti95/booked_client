import React, { useState, useEffect } from "react";
import CreateStoreBook from "../components/create_store_book/CreateStoreBook";

import StoreDeleteEdit from "../components/StoreDeleteEdit";
import OrderManagement from "../components/OrderManagement";
import LibraryDashboard from "./LibraryDashboard";
import useBookManagement from "../hooks/useBookManagement";
import useOrderManagement from "../hooks/useOrderManagement";
import "../index.css";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("admin"); // State to toggle views

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

  const handleToggleView = () => {
    setActiveView((prevView) => (prevView === "admin" ? "library" : "admin"));
  };

  return (
    <div className="dashboard">
      <h1 className="page-title">{activeView === "admin" ? "Store Management" : "Library Management"}</h1>

      <button className="toggle-view-btn" onClick={handleToggleView}>
        Switch to {activeView === "admin" ? "Library Management" : "Store Management"}
      </button>


  {activeView === "admin" ? (
    <div className="admin-dashboard">
      <h1 className="heading-secondary">Admin Dashboard</h1>

      <div className="create-book-section">
        <CreateStoreBook
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
        </div>
      ) : (
        <LibraryDashboard />
      )}
    </div>
  );
};

export default AdminDashboard;

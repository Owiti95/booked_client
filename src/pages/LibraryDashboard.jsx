import React from "react";
import CreateLibraryBook from "../components/CreateLibraryBook";
import LibraryDeleteEdit from "../components/LibraryDeleteEdit";
import LendingManagement from "../components/LendingManagement";
import AdminReturnRequests from "../components/AdminReturnRequests";
import useLibraryBookManagement from "../hooks/useLibraryBookManagement";
import useLendingManagement from "../hooks/useLendingManagement";
import "../index.css";

const LibraryDashboard = () => {
  const {
    books,
    newBook,
    isEditing,
    handleFormSubmit,
    handleInputChange,
    handleFileChange,
    handleEditBook,
    handleDeleteBook,
  } = useLibraryBookManagement();

  const {
    borrowings,
    loading,
    error,
    handleLendingAction,
  } = useLendingManagement();

  return (
    <div className="admin-dashboard">
      <div className="create-book-section">
        <CreateLibraryBook
          onSubmit={handleFormSubmit}
          newBook={newBook}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          isEditing={isEditing}
        />
      </div>

      <div className="book-cards-container">
      <LibraryDeleteEdit
        books={books}
        onEditBook={handleEditBook}
        onDeleteBook={handleDeleteBook}
      />
      </div>

      <div className="lending-management-section">
        <h2>Borrow Requests</h2>
        {loading ? (
          <p>Loading borrowings...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <LendingManagement
            borrowings={borrowings}
            onLendingAction={handleLendingAction}
          />
        )}
      </div>

      {/* Section for return requests */}
      <div className="return-requests-section">
        <h2>Return Requests</h2>
        <AdminReturnRequests />
      </div>

    </div>
  );
};

export default LibraryDashboard;

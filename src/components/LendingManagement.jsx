import React from "react";

const LendingManagement = ({ borrowings, onLendingAction }) => {
  return (
    <div className="lending-management">
      <h2>Lending Management</h2>
      {borrowings.length === 0 ? (
        <p>No lending requests available</p>
      ) : (
        <table className="lending-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Book</th>
              <th>Date Borrowed</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map((borrowing) => (
              <tr key={borrowing.id}>
                <td>{borrowing.id}</td>
                <td>{borrowing.user.name}</td>
                <td>{borrowing.book.title}</td>
                <td>{new Date(borrowing.date_borrowed).toLocaleDateString()}</td>
                <td>{new Date(borrowing.due_date).toLocaleDateString()}</td>
                <td>{borrowing.status}</td>
                <td>
                  {borrowing.status === "Pending" && (
                    <>
                      <button
                        onClick={() => onLendingAction(borrowing.id, "approve")}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onLendingAction(borrowing.id, "reject")}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </>
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

export default LendingManagement;

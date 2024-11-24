import React from "react";

const OrderManagement = ({ orders, onApproveOrder }) => {
  return (
    <div className="order-management">
      <h2>Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer_name}</td>
                <td>${order.total_price.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === "Pending" && (
                    <>
                      <button
                        onClick={() => onApproveOrder(order.id, "approve")}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onApproveOrder(order.id, "reject")}
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

export default OrderManagement;

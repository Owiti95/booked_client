import React from "react";

const EventList = ({ events, onEditEvent, onDeleteEvent }) => {
  return (
    <div className="event-list">
      <h2>Book List</h2>
      {events.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {events.map((book) => (
            <li key={book.id} className="event-item">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
              <p><strong>Stock:</strong> {book.stock}</p>
              {book.image_url && (
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="book-image"
                />
              )}
              <div className="action-buttons">
                <button
                  onClick={() =>
                    onEditEvent(book)
                  }
                >
                  Edit
                </button>
                <button onClick={() => onDeleteEvent(book.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;

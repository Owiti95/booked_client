import React from "react";

const LibraryDeleteEdit = ({ books, onEditBook, onDeleteBook }) => {
  return (
    <div className="book-list">
      <h2>Library Book List</h2>
      {books.length === 0 ? (
        <p>No library books available</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Copies Available:</strong> {book.copies_available}</p>
              {book.image_url && (
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="book-image"
                />
              )}
              <div className="action-buttons">
                <button onClick={() => onEditBook(book)}>Edit</button>
                <button onClick={() => onDeleteBook(book.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LibraryDeleteEdit;

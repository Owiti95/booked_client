import React from "react";
import BookCardStore from "./book_card_store/BookCardStore";

const LibraryDeleteEdit = ({ books, onEditBook, onDeleteBook }) => {
  return (
    <div className="event-list">
      <h2 className="heading-tertiary" style={{textAlign: "center", marginTop: "4.8rem", marginBottom: "2.4rem"}}>Library Book List</h2>
      {books.length === 0 ? (
        <p>No library books available</p>
      ) : (
        <ul className="booked_book-items">
          {books.map((book) => (
            <li key={book.id} className="booked_book-item">
              <BookCardStore title={book.title} author={book.author} genre={book.genre} isbn={book.isbn} stock={book.copies_available} img_url={book.image_url} onEdit={onEditBook} onDelete={onDeleteBook} book={book} book_id={book.id}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LibraryDeleteEdit;

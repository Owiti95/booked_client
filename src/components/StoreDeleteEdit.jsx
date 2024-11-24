import React from "react";
import BookCardStore from "./book_card_store/BookCardStore";

const EventList = ({ events, onEditEvent, onDeleteEvent }) => {
  return (
    <div className="event-list">
      <h2 className="heading-tertiary" style={{textAlign: "center", marginTop: "4.8rem", marginBottom: "2.4rem"}}>Book List</h2>
      {events.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul className="booked_book-items">
          {events.map((book) => (
            <li key={book.id} className="booked_book-item">
              <BookCardStore title={book.title} author={book.author} genre={book.genre} isbn={book.isbn} price={book.price} stock={book.stock} img_url={book.image_url} book_id={book.id} onEdit={onEditEvent} book={book} onDelete={onDeleteEvent}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
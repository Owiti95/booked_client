import React from "react";
import "./book_card_store.css"

const BookCardStore = ({title, author, genre, isbn, price, stock, img_url, book, book_id, onEdit, onDelete}) => (
    <div className="booked_card" >
        <img src={img_url} alt={title} className="booked_book-image"/>
        <div className="booked_card-info">
            <p className="booked_card-title">{title}</p>
            <div className="booked_card-details">
                <p className="booked_card-detail"><span className="booked_strong">Author:</span>{author}</p>
                <p className="booked_card-detail"><span className="booked_strong">Genre:</span>{genre}</p>
                <p className="booked_card-detail"><span className="booked_strong">ISBN:</span>{isbn}</p>
                <p className="booked_card-detail"><span className="booked_strong">Price:</span>{price}</p>
                <p className="booked_card-detail"><span className="booked_strong">Stock:</span>{stock}</p>
            </div>

            <div className="booked_btns">
                <button className="booked_btn" onClick={()=> onEdit(book)}>Edit</button>
                <button className="booked_btn" style={{backgroundColor: "red"}} onClick={()=>onDelete(book_id)}>Delete</button>
            </div>
        </div>
    </div>
)

export default BookCardStore;
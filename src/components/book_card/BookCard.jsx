import React from "react";
import { Link } from "react-router-dom";
import "./book_card.css"

const BookCard = ({image_url, title, author, genre, price, book_id, onAddToCart, addText, isStore, isLibrary, available_copies}) => (
    <div className="booked_card" >
        {image_url && (
            <img
            src={image_url}
            alt={title}
            className="book-image"
            />
        )}
        <div className="booked_card-info">
            <p className="booked_card-title">{title}</p>
            <div className="booked_card-details_container">
                <div className="booked_card-details">
                    <p className="booked_card-detail"><span className="booked_strong">Author:</span>{author}</p>
                    <p className="booked_card-detail"><span className="booked_strong">Genre:</span>{genre}</p>
                    {isLibrary && (
                    <p className="booked_card-detail"><span className="booked_strong">Avaiable Copies:</span>{available_copies}</p>
                    )}
                </div>
                {isStore && (
                    <p className="booked_card-price">{`$${price}`}</p>
                )} 
            </div>
            <div>
                <Link to={`/details/${book_id}`} className="view-details-button booked_btn" style={{backgroundColor:"#fff", color:"#4e41b1", border:"1px solid"}}>
                    View Details
                </Link>
                <button className="booked_btn" onClick={() => onAddToCart(book_id)}>{addText}</button>
            </div>
        </div>
    </div>
)

export default BookCard;
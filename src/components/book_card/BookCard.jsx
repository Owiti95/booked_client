import React from "react";
import "./book_card.css"

const BookCard = () => (
    <div className="booked_card" >
        <img src="./public/book_card.jpg" className="booked_book-img" alt="book image"/>
        <div className="booked_card-info">
            <p className="booked_card-title">Young Wizard</p>
            <div>
                <p className="booked_card-author">Aaron Loeb</p>
                <p className="booked_card-price">$ 87.75</p>
            </div>
            <button className="booked_btn">Add to cart</button>
        </div>
    </div>
)

export default BookCard;
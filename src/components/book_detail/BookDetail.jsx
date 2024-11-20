import React from "react";
import "./book_detail.css"

const BookDetail = () => (
    <section className="booked_details-section">
        <div className="booked_card" >
            <img src="./public/book_card.jpg" className="booked_book-img" alt="book image"/>
        </div>
        <div>
            <h2 className="booked_details-title">
                Dune
            </h2>
            <h3 className="booked_details-author">
            Frank Herbert
            </h3>
            <h4 className="booked_details-sumtitle">
                Summary
            </h4>
            <p className="booked_details-summary">
                Dune is set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs. It tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis. While the planet is an inhospitable and sparsely populated desert wasteland, it is the only source of melange, or "spice", a drug that extends life and enhances mental abilities. Melange is also necessary for space navigation, which requires a kind of multidimensional awareness and foresight that only the drug provides. As melange can only be produced on Arrakis, control of the planet is a coveted and dangerous undertaking. The story explores the multilayered interactions of politics, religion, ecology, technology, and human emotion, as the factions of the empire confront each other in a struggle for the control of Arrakis and its spice.
            </p>
        </div>
    </section>
    
)

export default BookDetail;

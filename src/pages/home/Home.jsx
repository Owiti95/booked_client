import React from "react";
import {Link } from 'react-router-dom';
import "./home.css"
import BookCard from "../../components/book_card/BookCard";

const Home = () => (
    <>
    <section className="booked_hero-section" >
        <div className="booked_hero-textbox">
            <h1 className="heading-primary">
                Read  to <span>develop</span> your brain
            </h1>
            <p className="booked_hero-description">
                From applied literature to educational resources, we have lots of books to offer you. We provide the most fantastic books for you to read.
            </p>
            <Link to="/library" class="btn">Start Reading</Link>
        </div>
    </section>

    <section className="booked_trending-section">
        <div className="booked_trending-info">
            <h2 className="heading-secondary">
            Trending this week
            </h2>

            <p className="booked_trending-description">
            Explore trending books this week that are read by most individuals
            </p>

            <div className="grid_4-cols booked_trending-images">
                <img src="./public/book_card.jpg" alt="Image of a book"/>
                <img src="./public/book_card2.jpg" alt="Image of a book"/>
                <img src="./public/book_card3.jpg" alt="Image of a book"/>
                <img src="./public/book_card4.jpg" alt="Image of a book"/>
            </div>
        </div>
    </section>

    <section className="booked_rules-section">
        <h2 className="heading-secondary">
            Library rules and guidelines
        </h2>
        
        <div className="booked_rules-section_container">
            <div className="booked_rules">
                <div className="booked_rules-item">
                    <p className="booked_rules-item_no">1</p>
                    <div>
                        <h3 className="heading-tertiary">Borrowing</h3>
                        <p className="booked_rules-description">
                            Books can only be borrowed using a current membership card and library materials should not be taken out of the library unless properly issued.
                        </p>
                    </div>
                </div>


                <div className="booked_rules-item">
                    <p className="booked_rules-item_no">2</p>
                    <div>
                        <h3 className="heading-tertiary">Renewal</h3>
                        <p className="booked_rules-description">
                            At the end of the loan period, books borrowed must be either returned or renewed. A book may only be renewed once and provided that another reader has not requested it.
                        </p>
                    </div>
                </div>
                
                <div className="booked_rules-item">
                    <p className="booked_rules-item_no">3</p>
                    <div>
                        <h3 className="heading-tertiary">
                            Loss and damage of library materials
                        </h3>
                        <p className="booked_rules-description">
                            All lost or damaged books or library materials must be replaced by a new one or by making a payment equivalent to the value of the book or material.
                        </p>
                    </div>
                </div>
            </div>
            <img src="https://images.unsplash.com/photo-1561380851-39b27c4f1626?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D"/>
        </div>
        
        <div className="booked_button-container">
            <button class="btn">Read all rules</button>
        </div>
    </section>
    </>
)

export default Home;

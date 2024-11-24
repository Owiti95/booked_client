import React, {useState, useEffect} from "react";
import {Link } from 'react-router-dom';
import "./home.css"
import BookCard from "../../components/book_card/BookCard";

const Home = () => {
    const images = [
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1514894780887-121968d00567?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxsaWJyYXJ5fGVufDB8fDB8fHww",
      ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
      

useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  const myStyle = {
    backgroundImage:
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${images[currentImageIndex]})`
    }

       
return (    <>
    <section className="booked_hero-section" >
        <div className="booked_hero-textbox" style={myStyle}>
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
}

export default Home;

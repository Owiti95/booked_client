import React from "react";
import {Link } from 'react-router-dom';
import { FaSquareInstagram, FaSquareFacebook, FaSquareTwitter } from "react-icons/fa6";
import "./footer.css";

const Footer = () => (
    <footer className="booked_footer">
      <div className="booked_footer-container">
        <div className="booked_logo-col">
          <a href="#" className="booked_footer-logo">
            <img className="logo" alt="booked logo" src="./public/booked_logo.png" />
          </a>

          <ul className="booked_social-links">
            <li>
              <a className="booked_footer-link" href="#"><FaSquareInstagram className="booked_social-icon" name="logo-instagram"/></a>
            </li>
            <li>
              <a className="booked_footer-link" href="#"><FaSquareFacebook className="booked_social-icon" name="logo-facebook"/></a>
            </li>
            <li>
              <a className="booked_footer-link" href="#"><FaSquareTwitter className="booked_social-icon" name="logo-twitter"/></a>
            </li>
          </ul>

          <p className="booked_copyright">
            Copyright &copy; 2027 by Booked, Inc. All rights reserved.
          </p>
        </div>

        <div className="booked_address-col">
          <p className="booked_footer-heading">Contact us</p>
          <address className="booked_contacts">
            <p className="booked_address">
                Kimathi St., 7th Floor, Nairobi, Kenya
            </p>
            <p>
              <a className="booked_footer-link" href="tel:+254-707-160-301">+254-707-160-301</a
              ><br />
              <a className="booked_footer-link" href="mailto:hello@omnifood.com"
                >hello@booked.com</a>
            </p>
          </address>
        </div>

        <nav className="booked_nav-col">
          <p className="booked_footer-heading">Account</p>
          <ul className="booked_footer-nav">
            <li><Link to="/register" className="booked_footer-link" href="#">Create account</Link></li>
            <li><Link to="/login" className="booked_footer-link" href="#">Sign in</Link></li>
            <li><a className="booked_footer-link" href="#">iOS app</a></li>
            <li><a className="booked_footer-link" href="#">Android app</a></li>
          </ul>
        </nav>

        <nav className="booked_nav-col">
          <p className="booked_footer-heading">Company</p>
          <ul className="booked_footer-nav">
            <li><a className="booked_footer-link" href="#">About Booked</a></li>
            <li><Link to="/library" className="booked_footer-link" href="#">Our Library</Link></li>
            <li><a className="booked_footer-link" href="#">Reading Partners</a></li>
            <li><a className="booked_footer-link" href="#">Careers</a></li>
          </ul>
        </nav>

        <nav className="booked_nav-col">
          <p className="booked_footer-heading">Resources</p>
          <ul className="booked_footer-nav">
            <li><Link to="/store" className="booked_footer-link" href="#">Our Store</Link></li>
            <li><a className="booked_footer-link" href="#">Help center</a></li>
            <li><a className="booked_footer-link" href="#">Privacy & terms</a></li>
          </ul>
        </nav>
      </div>
    </footer>
)

export default Footer;

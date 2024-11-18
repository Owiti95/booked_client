import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home"
import CartBorrowed from "./pages/cart_borrowed/CartBorrowed"
import CartCheckout from "./pages/cart_checkout/CartCheckout"
import Library from "./pages/library/Library"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Store from "./pages/store/Store"
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkoutcart" element={<CartCheckout />} />
          <Route path="/borrowedbooks" element={<CartBorrowed />} />
          <Route path="/library" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/store" element={<Store />} />
        </Routes>
        <Footer/>
    </BrowserRouter>
  );
};

export default App;
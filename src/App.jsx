
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./pages/store/Store";
import Library from "./pages/library/Library"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CartCheckout from "./pages/cart_checkout/CartCheckout";
import { UserProvider } from "./pages/UserContext";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";


const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/library" element={<Library />} />
          <Route path="/cart" element={<CartCheckout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
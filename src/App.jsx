import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Store from "./pages/store/Store";
import Library from "./pages/library/Library";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CartCheckout from "./pages/cart_checkout/CartCheckout";
import { UserProvider } from "./pages/UserContext";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";

const App = () => {
  // Check if the user is registered (using localStorage for simplicity)
  const isRegistered = localStorage.getItem("isRegistered");

  return (

        <main>
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/library" element={<Library />} />
          <Route path="/cart" element={<CartCheckout />} />
          <Route path="/login" element={<Login />} />
          
          {/* Conditionally render the Register route */}
          <Route
            path="/register"
            element={isRegistered ? <Navigate to="/login" replace /> : <Register />}
          />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </UserProvider>
         </main>
  );
};

export default App;

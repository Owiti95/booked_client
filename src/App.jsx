import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import Store from "./pages/store/Store";
import Library from "./pages/library/Library";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CartCheckout from "./pages/cart_checkout/CartCheckout";
import { UserProvider } from "./pages/UserContext";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import AdminPage from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/footer/Footer"; // Ensure Footer is defined and imported
import BookDetail from "./components/book_detail/BookDetail"
import "./App.css"
import CartBorrowed from "./pages/cart_borrowed/CartBorrowed";
import History from "./pages/History";

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App = () => {
  const isRegistered = localStorage.getItem("isRegistered");

  return (
    <main className="app-container">
      <UserProvider>
        <Router>
          <Routes>
            {/* Routes with navbar and footer */}
            <Route path="/" element={<MainLayout><Home/></MainLayout>} />
            <Route path="/store" element={<MainLayout><Store/></MainLayout>} />
            <Route path="/library" element={<MainLayout><Library/></MainLayout>} />
            <Route path="/cart" element={<MainLayout><CartCheckout/></MainLayout>} />
            <Route path="/details" element={<MainLayout><BookDetail/></MainLayout>} />
            <Route path="/borrowings" element={<MainLayout><CartBorrowed/></MainLayout>} />
            <Route path="/history" element={<MainLayout><History/></MainLayout>} />

            {/* Route paths without login and footer */}
            <Route path="/login" element={<Login />} />

            {/* Conditionally render the Register route */}
            <Route
              path="/register"
              element= {<Register />}
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback route for undefined paths */}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </main>
  );
};

export default App;
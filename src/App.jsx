// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Store from "./pages/store/Store";
// import Library from "./pages/library/Library";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import CartCheckout from "./pages/cart_checkout/CartCheckout";
// import { UserProvider } from "./pages/UserContext";
// import Navbar from "./components/navbar/Navbar";
// import Home from "./pages/home/Home";

// const App = () => {
//   // Check if the user is registered (using localStorage for simplicity)
//   const isRegistered = localStorage.getItem("isRegistered");

//   return (

//         <main>
//     <UserProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/store" element={<Store />} />
//           <Route path="/library" element={<Library />} />
//           <Route path="/cart" element={<CartCheckout />} />
//           <Route path="/login" element={<Login />} />
          
//           {/* Conditionally render the Register route */}
//           <Route
//             path="/register"
//             element={isRegistered ? <Navigate to="/login" replace /> : <Register />}
//           />
//         </Routes>
//         <Footer/>
//       </BrowserRouter>
//     </UserProvider>
//         </main>
//   );
// };

// export default App;
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
import Footer from "./components/footer/Footer"; // Ensure Footer is defined and imported
import BookDetail from "./components/book_detail/BookDetail"
import "./App.css"

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);


const App = () => {
  // Check if the user is registered (using localStorage for simplicity)
  const isRegistered = localStorage.getItem("isRegistered");

  return (
    <main className="app-container">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* Routes with navbar and footer */}
            <Route path="/" element={<MainLayout><Home/></MainLayout>} />
            <Route path="/store" element={<MainLayout><Store/></MainLayout>} />
            <Route path="/library" element={<MainLayout><Library/></MainLayout>} />
            <Route path="/cart" element={<MainLayout><CartCheckout/></MainLayout>} />
            <Route path="/details" element={<MainLayout><BookDetail/></MainLayout>} />

            {/* Route paths without login and footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<BookDetail/>} />
            {/* Conditionally render the Register route */}
            <Route
              path="/register"
              element={isRegistered ? <Navigate to="/login" replace /> : <Register />}
            />
            {/* Fallback route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
            
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </main>
  );
};

export default App;

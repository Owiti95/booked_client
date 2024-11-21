// // import React from "react";
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import Store from "./pages/store/Store";
// // import Library from "./pages/library/Library";
// // import Login from "./pages/login/Login";
// // import Register from "./pages/register/Register";
// // import CartCheckout from "./pages/cart_checkout/CartCheckout";
// // import { UserProvider } from "./pages/UserContext";
// // import Navbar from "./components/navbar/Navbar";
// // import Home from "./pages/home/Home";

// // const App = () => {
// //   // Check if the user is registered (using localStorage for simplicity)
// //   const isRegistered = localStorage.getItem("isRegistered");

// //   return (

// //         <main>
// //     <UserProvider>
// //       <BrowserRouter>
// //         <Navbar />
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/store" element={<Store />} />
// //           <Route path="/library" element={<Library />} />
// //           <Route path="/cart" element={<CartCheckout />} />
// //           <Route path="/login" element={<Login />} />
          
// //           {/* Conditionally render the Register route */}
// //           <Route
// //             path="/register"
// //             element={isRegistered ? <Navigate to="/login" replace /> : <Register />}
// //           />
// //         </Routes>
// //         <Footer/>
// //       </BrowserRouter>
// //     </UserProvider>
// //         </main>
// //   );
// // };

// // // export default App;
// // import React from "react";
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import Store from "./pages/store/Store";
// // import Library from "./pages/library/Library";
// // import Login from "./pages/login/Login";
// // import Register from "./pages/register/Register";
// // import CartCheckout from "./pages/cart_checkout/CartCheckout";
// // import { UserProvider } from "./pages/UserContext";
// // import Navbar from "./components/navbar/Navbar";
// // import Home from "./pages/home/Home";
// // import Footer from "./components/footer/Footer"; // Ensure Footer is defined and imported
// // // import AdminDashboard from "./pages/AdminDashboard";

// // const App = () => {
// //   // Check if the user is registered (using localStorage for simplicity)
// //   const isRegistered = localStorage.getItem("isRegistered");

// //   return (
// //     <main className="app-container">
// //       <UserProvider>
// //         <BrowserRouter>
// //           <Navbar />
// //           <Routes>
// //             <Route path="/" element={<Home />} />
// //             <Route path="/store" element={<Store />} />
// //             <Route path="/library" element={<Library />} />
// //             <Route path="/cart" element={<CartCheckout />} />
// //             <Route path="/login" element={<Login />} />
            
// //             {/* Conditionally render the Register route */}
// //             <Route
// //               path="/register"
// //               element={isRegistered ? <Navigate to="/login" replace /> : <Register />}
// //             />
// //             {/* <Route path="/admin" element={<AdminDashboard />}/> */}

// //             {/* Fallback route for undefined paths */}
// //             <Route path="*" element={<Navigate to="/" replace />} />
            
// //           </Routes>
// //           <Footer />
// //         </BrowserRouter>
// //       </UserProvider>
// //     </main>
// //   );
// // };

// // export default App;


// import React from "react";
// import { BrowserRoutetRoutes, Route, Navigate } from "react-router-dom";
// import Store from "./pages/store/Store";
// import Library from "./pages/library/Library";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import CartCheckout from "./pages/cart_checkout/CartCheckout";
// import { UserProvider } from "./pages/UserContext";
// import Navbar from "./components/navbar/Navbar";
// import Home from "./pages/home/Home";
// import Footer from "./components/footer/Footer";
// import AdminPage from "./pages/AdminPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminPage from "./pages/AdminPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/login/Login";
// import Store from "./pages/store/Store";


// const App = () => {
//   const isRegistered = localStorage.getItem("isRegistered");

//   return (
//     <main className="app-container">
//       <UserProvider>
//         <BrowserRouter>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/store" element={<Store />} />
//             <Route path="/library" element={<Library />} />
//             <Route path="/cart" element={<CartCheckout />} />
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/register"
//               element={isRegistered ? <Navigate to="/login" replace /> : <Register />}
//             />
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute>
//                   <AdminPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//           <Footer />
//         </BrowserRouter>
//       </UserProvider>
//     </main>
//   );
// };

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminPage from "./pages/AdminPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/login/Login";
// import Store from "./pages/store/Store";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/store" element={<Store />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <AdminPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
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
import Footer from "./components/footer/Footer";
import AdminPage from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const isRegistered = localStorage.getItem("isRegistered");

  return (
    <main className="app-container">
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/library" element={<Library />} />
            <Route path="/cart" element={<CartCheckout />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={isRegistered ? <Navigate to="/login" replace /> : <Register />}
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </main>
  );
};

export default App;

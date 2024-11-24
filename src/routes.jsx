import App from "./App"
import Home from "./pages/home/Home"
import CartBorrowed from "./pages/cart_borrowed/CartBorrowed"
import CartCheckout from "./pages/cart_checkout/CartCheckout"
import Library from "./pages/library/Library"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Store from "./pages/store/Store"

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/borrowedbooks",
                element: <CartBorrowed />,
            },
            {
                path: "/checkoutcart",
                element: <CartCheckout />,
            },
            {
                path: "/library",
                element: <Library />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/store",
                element: <Store />,
            }
        ]
    }
]

export default routes;
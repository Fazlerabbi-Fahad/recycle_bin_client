import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import Blog from "../../Pages/Blog/Blog";
import Contact from "../../Pages/Contact/Contact";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import Category from "../../Pages/Home/Categories/Category/Category";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyOrder from "../../Pages/Home/Categories/MyOrder/MyOrder";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/categories/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`),
                element: <PrivateRoute><Category></Category></PrivateRoute>
            },
            {
                path: '/myorders',
                element: <PrivateRoute><MyOrder></MyOrder></PrivateRoute>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])

export default routes;
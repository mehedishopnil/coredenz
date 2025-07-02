import { createBrowserRouter } from "react-router";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Products from "../pages/Products/Products";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/sign-in",
                element: <SignIn />,
            },
            {
                path: "/sign-up",
                element: <SignUp />,
            },
            [
                {
                    path: "/products",
                    element: <Products />,
                }
            ]
        ]
    }
])
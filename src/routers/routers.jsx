import { createBrowserRouter } from "react-router";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";



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
            }
        ]
    }
])
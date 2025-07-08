import { createBrowserRouter } from "react-router";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Products from "../pages/Products/Products";
import SingleProductPage from "../components/SingleProductPage/SingleProductPage";
import Cart from "../components/Cart/Cart";
import Development from "../pages/Development/Development";
import GraphicDesign from "../pages/GraphicDesign/GraphicDesign";
import WebDevLandingPage from "../components/WebDevLandingPage";
import Checkout from "../components/Checkout/Checkout";

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

      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/single-product/:id",
        element: <SingleProductPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/services/development",
        element: <Development />,
      },
      {
        path: "/services/graphic-design",
        element: <GraphicDesign />,
      },
      {
        path: "web-dev-landing",
        element: <WebDevLandingPage />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      }
    ],
  },
]);

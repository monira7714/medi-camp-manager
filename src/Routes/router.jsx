import { createBrowserRouter } from "react-router-dom";
import Main from './../Layout/Main';
import ErrorPage from "../ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import ContactUs from "../Pages/ContactUs/ContactUs";
import CampDetails from "../Pages/CampDetail/CampDetails";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: 'register',
            element: <Register></Register>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
          path: 'home',
          element:<Home></Home>
        },
        {
          path:'availableCamps',
          element: <AvailableCamps></AvailableCamps>
        },
        {
          path: 'camp-details/:campId',
          element: <CampDetails></CampDetails>
        },
        {
          path: 'contactUs',
          element: <ContactUs></ContactUs>
        }
      ]
    },
  ]);

  export default router;
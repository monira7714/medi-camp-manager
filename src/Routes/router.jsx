import { createBrowserRouter } from "react-router-dom";
import Main from './../Layout/Main';
import ErrorPage from "../ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import ContactUs from "../Pages/ContactUs/ContactUs";
import CampDetails from "../Pages/CampDetail/CampDetails";
import PrivateRouter from './PrivateRouter';
import Dashboard from "../Layout/Dashboard";
import ParticipantProfile from "../Pages/Dashboard/ParticipantProfile/ParticipantProfile";
import AddCamp from "../Pages/Dashboard/AddCamp/AddCamp";
import AllUsers from "../Pages/Dashboard/AllUser/AllUsers";
  
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
          path: '/',
          element:<Home></Home>
        },
        {
          path:'availableCamps',
          element: <AvailableCamps></AvailableCamps>
        },
        {
          path: 'camp-details/:campId',
          element: <PrivateRouter><CampDetails></CampDetails></PrivateRouter>
        },
        {
          path: 'contactUs',
          element: <ContactUs></ContactUs>
        }
      ]
    },
    {
      path: "dashboard",
      element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: 'participant-profile',
          element: <ParticipantProfile></ParticipantProfile>
        },
        {
          path:'add-a-camp',
          element:<AddCamp></AddCamp>
        },
        {
          path: 'allUsers',
          element: <AllUsers></AllUsers>
        }
      ]
    }
  ]);

  export default router;
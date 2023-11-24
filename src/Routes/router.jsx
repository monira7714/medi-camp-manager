import { createBrowserRouter } from "react-router-dom";
import Main from './../Layout/Main';
import ErrorPage from "../ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/register',
            element: <Register></Register>
        }
      ]
    },
  ]);

  export default router;
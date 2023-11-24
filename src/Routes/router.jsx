import { createBrowserRouter } from "react-router-dom";
import Main from './../Layout/Main';
import ErrorPage from "../ErrorPage/ErrorPage";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>
    },
  ]);

  export default router;


//gg

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage,{action as HomeAction,loader as HomeLoader} from "./Pages/HomePage";
import EditPage, { loader as EditLoader } from "./Pages/EditPage";
import ViewPage ,{loader as ViewLoader} from "./Pages/ViewPage"
import RegisterPage,{action as registerAction} from "./Pages/Register";
import LoginPage,{action as loginAction}  from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import FirstPage from "./Pages/FirstPage";
import TestPage from "./Pages/TestPage";
import ManageChildren from "./Pages/ManageChildren";
// In your index.js or App.js file
import axios from 'axios';

// Set global configuration for axios
axios.defaults.withCredentials = true;






const router = createBrowserRouter([
  {
    path :"test",
    element : <TestPage/>
  },
  {
    path: "/",
    element: <FirstPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <FirstPage />,
      },
   
    ],
  },
  {
    path: "dashboard",
    element: <ManageChildren />,// 🔹 Wrapper for nested routes
   
    children: [
      {
        index: true,
        element: <HomePage />,
        loader : HomeLoader,
        action: HomeAction,
      
      },
      {
        path: "edit/:id",
        element: <EditPage />,
        loader: EditLoader , // 🔹 Action for updating a note
      },
      {
        path : "view/:id",
        element : <ViewPage/>,
        loader : ViewLoader,
      }
    ],
  },
  {
    path: "register",
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: "login",
    element: <LoginPage />,
    action: loginAction,
    
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

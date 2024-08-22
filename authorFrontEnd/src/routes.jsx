import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Signup from "./components/Signup";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
];

export default routes;

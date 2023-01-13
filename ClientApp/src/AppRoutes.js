
import Home from "./components/pages/Home";
import Login from "./components/Login";
import Register from "./components/pages/Register";
import TodoList from "./components/pages/TodoList";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/todo-list",
    element: <TodoList />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  
  {
    path: "/login",
    element: <Login />,
  },
];

export default AppRoutes;

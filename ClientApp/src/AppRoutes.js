import Home from "./components/pages/Home";
import Login from "./components/Login";
import Register from "./components/pages/Register";
import TodoList from "./components/pages/TodoList";

export const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/todo-list",
    element: <TodoList />,
  },
];

export const UnauthorizedRoutes = [
  {
    path: "/register",
    element: <Register />,
  },

  {
    index: true,
    element: <Login />,
  },
];

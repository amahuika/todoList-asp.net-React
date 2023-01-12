import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";
import Register from "./components/Register";
import TodoList from "./components/TodoList";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "/todo-list",
    element: <TodoList />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default AppRoutes;

import { Provider } from "react-redux";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AddNote from "./pages/AddNote";
import Archived from "./pages/Archived";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateNote from "./pages/UpdateNote";
import store from "./store/store";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (localStorage.access_token) {
        return null;
      }
      return redirect("/login");
    },
    children: [
      { path: "/", element: <Home /> },
      { path: "/archived", element: <Archived /> },
      { path: "/add-note", element: <AddNote /> },
      { path: "/update-note/:id", element: <UpdateNote /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>;
    </Provider>
  );
}
export default App;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ListPerson from "../pages/ListPerson";
import Error from "../components/Error";
import NewElement from "../pages/NewElement";
import EditElement from "../pages/EditElement";

import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/people",
        element: <ListPerson />,
        errorElement: <Error />,
      },
      {
        path: "/new_person",
        element: <NewElement />,
        errorElement: <Error />,
      },
      {
        path: "/edit_person/:id",
        element: <EditElement />,
        errorElement: <Error />,
      },
    ],
  },
]);

export default router;

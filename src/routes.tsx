import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import YearPage from "./pages/YearPage/YearPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/:year",
        element: <YearPage />,
      },
    ],
  },
]);

export default router;

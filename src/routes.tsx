import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import YearPage from "./pages/YearPage/YearPage";
import MonthByYear from "./pages/MonthsByYear/MonthsByYear";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "year/:year",
        element: <YearPage />,
      },
      {
        path: "/month/:month/year/:year",
        element: <MonthByYear />,
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);

export default router;

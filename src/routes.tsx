import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import YearPage from "./pages/YearPage/YearPage";
import MonthByYear from "./components/MonthsByYear";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/:year",
        element: <YearPage />,
        children: [
          {
            path: "/:year/:month",
            element: <MonthByYear />,
          },
        ],
      },
    ],
  },
]);

export default router;

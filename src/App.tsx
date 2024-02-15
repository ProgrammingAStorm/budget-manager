import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { fetchYears } from "./redux/thunks/yearThunks";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { fetchCategories } from "./redux/thunks/categoryThunks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchYears());
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

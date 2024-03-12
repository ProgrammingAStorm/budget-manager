import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { fetchYears } from "./redux/thunks/yearThunks";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { fetchCategories } from "./redux/thunks/categoryThunks";
import { fetchSubCategories } from "./redux/thunks/subCategoryThunks";
import { fetchBudgets } from "./redux/thunks/budgetThunks";
import { fetchTransactions } from "./redux/thunks/transactionThunks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchYears());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchTransactions());
    dispatch(fetchBudgets());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

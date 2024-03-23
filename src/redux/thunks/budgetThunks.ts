import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  generateBudget,
  prepareDataForBudgetGeneration,
} from "../../utils/budget";

const fetchBudgets = createAsyncThunk("budgets/fetchBudgets", async () => {
  const response = await fetch(`http://localhost:3000/budgets`);
  return await response.json();
});

const generateBudgetFromTransactions = createAsyncThunk(
  "budgets/generateBudgetFromTransactions",
  async (_, { getState, dispatch }) => {
    const store = getState() as RootState;

    const {
      totalIncome,
      withdrawls,
      categories,
      subCategories,
      subCategoriesByCategory,
    } = prepareDataForBudgetGeneration(store);

    const budget = generateBudget(
      "budget",
      totalIncome,
      withdrawls,
      categories,
      subCategories,
      subCategoriesByCategory
    );

    await fetch("http://localhost:3000/budgets", {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify(budget),
    });

    dispatch(fetchBudgets());
  }
);

export { fetchBudgets, generateBudgetFromTransactions };

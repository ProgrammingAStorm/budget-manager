import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { generateBudget } from "../../utils/budget";
import Enumberable from "linq";
import Transaction from "../../models/transaction";
import { getCategoriesFromTransactions } from "../../utils/categories";
import Enumerable from "linq";

const fetchBudgets = createAsyncThunk("budgets/fetchBudgets", async () => {
  const response = await fetch(`http://localhost:3000/budgets`);
  return await response.json();
});

const generateBudgetFromTransactions = createAsyncThunk(
  "budgets/generateBudgetFromTransactions",
  async (_, { getState, dispatch }) => {
    const store = getState() as RootState;

    const transactions = Enumberable.from<Transaction>(store.transactions);
    const categories = getCategoriesFromTransactions(transactions);
    const subCategories = getSubCategoriesFromCategories(categories);
    const subCategoriesByCategory = getSubCategoriesByCategory(categories);

    const budget = generateBudget(
      "budget",
      transactions,
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

    function getSubCategoriesFromCategories(
      categories: Enumerable.IEnumerable<string>
    ) {
      const subCategories = Enumerable.from(store.subCategories);

      return subCategories
        .where((subCategory) =>
          categories.any((category) => category === subCategory.parentCategory)
        )
        .select((subCategory) => subCategory.id)
        .flatten() as Enumerable.IEnumerable<string>;
    }

    function getSubCategoriesByCategory(
      categories: Enumerable.IEnumerable<string>
    ) {
      const subCategories = Enumerable.from(store.subCategories);

      return categories.toDictionary(
        (category) => category,
        (category) =>
          subCategories
            .where((subCategories) => subCategories.parentCategory === category)
            .select((subCategory) => subCategory.id)
      );
    }
  }
);

export { fetchBudgets, generateBudgetFromTransactions };

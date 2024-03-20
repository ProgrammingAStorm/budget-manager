import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostTransactionForm } from "../../components/AddTransactionComponent";

const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactionsByYear",
  async () => {
    const response = await fetch("http://localhost:3000/transactions");
    return await response.json();
  }
);

const fetchTransactionsByYear = createAsyncThunk(
  "transactions/fetchTransactionsByYear",
  async (yearId: string) => {
    const response = await fetch(
      `http://localhost:3000/transactions?year=${yearId}`
    );
    return await response.json();
  }
);

const postTransaction = createAsyncThunk(
  "transactions/postTransaction",
  async (
    { amount, category, month, name, subCategory, year }: PostTransactionForm,
    { dispatch }
  ) => {
    const request = {
      amount: amount!,
      category: category!.id,
      month: month?.label,
      name: name!,
      subCategory: subCategory!.id,
      year: year!.id,
    };

    await fetch("http://localhost:3000/transactions", {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify(request),
    });

    dispatch(fetchTransactions());
  }
);

export { fetchTransactions, fetchTransactionsByYear, postTransaction };

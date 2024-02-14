import { createAsyncThunk } from "@reduxjs/toolkit";
const fetchTransactionsByYear = createAsyncThunk(
  "transactions/fetchTransactions",
  async (yearId: number) => {
    const response = await fetch(
      `http://localhost:3000/transactions?year_gte=${yearId}`
    );
    return await response.json();
  }
);

export { fetchTransactionsByYear };

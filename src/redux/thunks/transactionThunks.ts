import { createAsyncThunk } from "@reduxjs/toolkit";
const fetchTransactionsByYear = createAsyncThunk(
  "transactions/fetchTransactions",
  async (yearId: string) => {
    const response = await fetch(
      `http://localhost:3000/transactions?year=${yearId}`
    );
    return await response.json();
  }
);

export { fetchTransactionsByYear };

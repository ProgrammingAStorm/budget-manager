import { createSlice } from "@reduxjs/toolkit";
import Transaction from "../../models/transaction";
import {
  fetchTransactionsByYear,
  postTransaction,
} from "../thunks/transactionThunks";

// Define the initial state using that type
const initialState: Transaction[] = [];

export const transactionsSlice = createSlice({
  name: "transactions",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTransactionsByYear.fulfilled,
      (_, { payload }) => payload
    );
    //builder.addCase(postTransaction.fulfilled, (_, { payload }) => payload);
  },
});

//export const {} = transactionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.year.value

export default transactionsSlice.reducer;

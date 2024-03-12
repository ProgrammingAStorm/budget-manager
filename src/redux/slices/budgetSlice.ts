import { createSlice } from "@reduxjs/toolkit";
import Budget from "../../models/budget";
import { fetchBudgets } from "../thunks/budgetThunks";

const initialState: Budget[] = [];

export const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBudgets.fulfilled, (_, { payload }) => payload);
  },
});

export default budgetSlice.reducer;

//export const selectBudgets = ({ budgets }: RootState) => budgets;

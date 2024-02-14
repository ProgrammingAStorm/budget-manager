import { createSlice } from "@reduxjs/toolkit";
import Year from "../../models/year";
import { fetchYears } from "../thunks/yearThunks";

// Define the initial state using that type
const initialState: Year[] = [];

export const yearsSlice = createSlice({
  name: "years",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchYears.fulfilled, (_, { payload }) => payload);
  },
});

export const {} = yearsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.year.value

export default yearsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import category from "../../models/category";
import { fetchCategories } from "../thunks/categoryThunks";

// Define the initial state using that type
const initialState: category[] = [];

export const categoriesSlice = createSlice({
  name: "categories",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (_, { payload }) => payload);
  },
});

//export const {} = categoriesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.year.value

export default categoriesSlice.reducer;

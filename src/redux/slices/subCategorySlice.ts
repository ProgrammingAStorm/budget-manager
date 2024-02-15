import { createSlice } from "@reduxjs/toolkit";
import SubCategory from "../../models/subCategory";
import { fetchSubCategories } from "../thunks/subCategoryThunks";

// Define the initial state using that type
const initialState: SubCategory[] = [];

export const subCategoriesSlice = createSlice({
  name: "subcategoryies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubCategories.fulfilled, (_, { payload }) => payload);
  },
});

//export const {} = subcategoryiesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.subcategory.value

export default subCategoriesSlice.reducer;

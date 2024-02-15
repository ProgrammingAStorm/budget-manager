import { createAsyncThunk } from "@reduxjs/toolkit";
import SubCategory from "../../models/subCategory";

const fetchSubCategories = createAsyncThunk<SubCategory[]>(
  "subcategories/fetchSubCategories",
  async () => {
    const response = await fetch("http://localhost:3000/subCategories");

    return await response.json();
  }
);

export { fetchSubCategories };

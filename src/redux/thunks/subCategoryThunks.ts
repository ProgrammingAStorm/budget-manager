import { createAsyncThunk } from "@reduxjs/toolkit";
import SubCategory from "../../models/subCategory";
import { putSubCategoryIntoCategory } from "./categoryThunks";

const fetchSubCategories = createAsyncThunk<SubCategory[]>(
  "subcategories/fetchSubCategories",
  async () => {
    const response = await fetch("http://localhost:3000/subCategories");

    return await response.json();
  }
);

const postSubCategory = createAsyncThunk(
  "subcategories/postSubCategory",
  async ({ parentCategory, name }: SubCategory, { dispatch }) => {
    const response = await fetch("http://localhost:3000/subCategories", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ parentCategory, name }),
    });

    const { id } = await response.json();

    dispatch(putSubCategoryIntoCategory({ id, parentCategory }));
    dispatch(fetchSubCategories());
  }
);

export { fetchSubCategories, postSubCategory };

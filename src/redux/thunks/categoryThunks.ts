import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(`http://localhost:3000/categories`);
    return await response.json();
  }
);

const postCategory = createAsyncThunk(
  "categorys/postCategory",
  async (category: string, thunkApi) => {
    await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: category, subCategories: [] }),
    });

    thunkApi.dispatch(fetchCategories());
  }
);

const putSubCategoryIntoCategory = createAsyncThunk(
  "categories/putSubCategoryIntoCategory",
  async (
    { parentCategory, id }: { parentCategory: string; id: string },
    { dispatch, getState }
  ) => {
    debugger;
    const { categories } = getState() as RootState;
    const category = categories.find((c) => c.id === parentCategory)!;

    await fetch(`http://localhost:3000/categories/${parentCategory}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...category,
        subCategories: [...category.subCategories, id],
      }),
    });

    dispatch(fetchCategories());
  }
);

export { fetchCategories, postCategory, putSubCategoryIntoCategory };

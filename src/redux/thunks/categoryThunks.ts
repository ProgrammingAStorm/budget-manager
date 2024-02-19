import { createAsyncThunk } from "@reduxjs/toolkit";
import Category from "../../models/category";

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

export { fetchCategories, postCategory };

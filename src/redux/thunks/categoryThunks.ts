import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(`http://localhost:3000/categories`);
    return await response.json();
  }
);

export { fetchCategories };

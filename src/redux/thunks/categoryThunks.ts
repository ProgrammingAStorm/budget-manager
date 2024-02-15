import { createAsyncThunk } from "@reduxjs/toolkit";
import Category from "../../models/category";

const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(`http://localhost:3000/categories`);
    return await response.json();
  }
);

export { fetchCategories };

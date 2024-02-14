import { createAsyncThunk } from "@reduxjs/toolkit";
import Year from "../../models/year";

const fetchYears = createAsyncThunk<Year[]>("years/fetchYears", async () => {
  const response = await fetch("http://localhost:3000/years");

  return await response.json();
});

export { fetchYears };

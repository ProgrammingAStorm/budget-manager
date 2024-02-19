import { createAsyncThunk } from "@reduxjs/toolkit";
import Year from "../../models/year";

const fetchYears = createAsyncThunk<Year[]>("years/fetchYears", async () => {
  const response = await fetch("http://localhost:3000/years");

  return await response.json();
});

const postYear = createAsyncThunk(
  "years/postYears",
  async (year: string, thunkApi) => {
    await fetch("http://localhost:3000/years", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ value: year }),
    });

    thunkApi.dispatch(fetchYears());
  }
);

export { fetchYears, postYear };

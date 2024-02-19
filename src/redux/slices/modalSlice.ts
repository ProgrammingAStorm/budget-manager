import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface ModalState {
  open: boolean;
  component: string | null;
}

const initialState: ModalState = {
  open: false,
  component: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (_, { payload }) => payload,
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;

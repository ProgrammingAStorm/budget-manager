import { Box, Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import { postCategory } from "../redux/thunks/categoryThunks";
import { useAppDispatch } from "../redux/hooks";
import { setModal } from "../redux/slices/modalSlice";
import { postSubCategory } from "../redux/thunks/subCategoryThunks";

export default function AddSubCategoryComponent() {
  const dispatch = useAppDispatch();
  dispatch(postSubCategory({ name: "asd", parentCategory: "1", id: null }));

  return <div></div>;
}

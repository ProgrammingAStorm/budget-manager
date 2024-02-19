import { Box, Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import { postCategory } from "../redux/thunks/categoryThunks";
import { useAppDispatch } from "../redux/hooks";
import { setModal } from "../redux/slices/modalSlice";

export default function AddCategoryComponent() {
  const dispatch = useAppDispatch();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    dispatch(postCategory(formData.get("category")?.toString()!));
    dispatch(setModal({ open: false, componenet: null }));
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display={"flex"}
      flexDirection={"column"}
      gap={".5rem"}
      padding={"1rem"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"fit-content"}
      onSubmitCapture={handleSubmit}
    >
      <TextField
        label="Category"
        placeholder={"Utilities"}
        type="text"
        name="category"
        required
      />

      <Button variant="contained" sx={{ width: "fit-content" }} type="submit">
        Submit
      </Button>
    </Box>
  );
}

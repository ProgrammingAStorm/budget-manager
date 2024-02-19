import { Box, Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import { postYear } from "../redux/thunks/yearThunks";
import { useAppDispatch } from "../redux/hooks";
import { setModal } from "../redux/slices/modalSlice";

export default function AddYearComponent() {
  const dispatch = useAppDispatch();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    dispatch(postYear(formData.get("year")?.toString()!));
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
        label="Year"
        placeholder={new Date().toDateString().split(" ")[3]}
        type="number"
        name="year"
        required
      />

      <Button variant="contained" sx={{ width: "fit-content" }} type="submit">
        Submit
      </Button>
    </Box>
  );
}

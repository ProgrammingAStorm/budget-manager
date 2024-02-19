import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setModal } from "../redux/slices/modalSlice";
import { postSubCategory } from "../redux/thunks/subCategoryThunks";

export default function AddSubCategoryComponent() {
  const categories = useAppSelector((s) => s.categories);
  const dispatch = useAppDispatch();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    dispatch(
      postSubCategory({
        name: formData.get("subCategory")?.toString()!,
        parentCategory: formData.get("category")?.toString()!,
        id: null,
      })
    );
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
    >
      <FormControl sx={{ width: "100%" }}>
        <InputLabel>Category</InputLabel>
        <Select name="category" placeholder="Category">
          {categories.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Sub-Category"
        placeholder={"Heating"}
        type="text"
        name="subCategory"
        required
      />

      <Button variant="contained" sx={{ width: "fit-content" }} type="submit">
        Submit
      </Button>
    </Box>
  );
}

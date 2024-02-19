import { Box, Button, TextField } from "@mui/material";

export default function AddYearComponent() {
  function handleSubmit() {}

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
      onSubmitCapture={(e) => {
        e.preventDefault();
      }}
    >
      <TextField
        label="Year"
        placeholder={new Date().toDateString().split(" ")[3]}
        type="number"
        required
      />

      <Button variant="contained" sx={{ width: "fit-content" }} type="submit">
        Submit
      </Button>
    </Box>
  );
}

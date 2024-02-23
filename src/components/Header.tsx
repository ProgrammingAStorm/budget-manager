import { AppBar, Box, Stack } from "@mui/material";
import YearSelector from "./YearSelector";
import AddItemMenu from "./AddItemMenu";

export default function Header() {
  return (
    <>
      <Box>
        <AppBar component="header" position="static">
          <Box component={"nav"}>
            <YearSelector />

            <AddItemMenu />
          </Box>
        </AppBar>
      </Box>
    </>
  );
}

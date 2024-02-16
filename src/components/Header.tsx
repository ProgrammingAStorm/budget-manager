import { AppBar, Box, Stack } from "@mui/material";
import YearSelector from "./YearSelector";
import AddItemDropdown from "./AddItemDropdown";

export default function Header() {
  return (
    <>
      <Box>
        <AppBar component="header" position="static">
          <Box component={"nav"}>
            <YearSelector />

            <AddItemDropdown />
          </Box>
        </AppBar>
      </Box>
    </>
  );
}

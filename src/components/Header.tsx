import { AppBar, Box } from "@mui/material";
import YearSelector from "./YearSelector";

export default function Header() {
  return (
    <>
      <Box>
        <AppBar component="header" sx={{ height: "85px" }}>
          <Box component={"nav"}>
            <YearSelector />
          </Box>
        </AppBar>
      </Box>
    </>
  );
}

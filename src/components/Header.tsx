import { AppBar, Box, Stack } from "@mui/material";
import YearSelector from "./YearSelector";

export default function Header() {
  return (
    <>
      <Box>
        <AppBar component="header" position="static" sx={{ minHeight: "85px" }}>
          <Box component={"nav"}>
            <Stack>
              <YearSelector />
            </Stack>
          </Box>
        </AppBar>
      </Box>
    </>
  );
}

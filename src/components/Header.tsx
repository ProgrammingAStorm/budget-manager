import { AppBar, Box, IconButton, Stack } from "@mui/material";
import AddItemMenu from "./AddItemMenu";
import NavigationDrawer from "./NavigationDrawer";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar component="header" position="static">
        <Stack direction={"row"} justifyContent={"space-between"}>
          <IconButton onClick={() => navigate("/")}>
            <Home />
          </IconButton>

          <Box>
            <AddItemMenu />

            <NavigationDrawer />
          </Box>
        </Stack>
      </AppBar>
    </>
  );
}

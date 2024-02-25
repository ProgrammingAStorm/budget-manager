import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import YearSelector from "./YearSelector";

export default function NavigationDrawer() {
  const [open, setOpen] = useState(false);

  function toggleDrawer(newOpen: boolean) {
    return function () {
      setOpen(newOpen);
    };
  }

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Accordion sx={{ width: "100%" }}>
                  <AccordionSummary>
                    <Typography variant="h2" fontSize={"1rem"}>
                      Year
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <YearSelector />
                  </AccordionDetails>
                </Accordion>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

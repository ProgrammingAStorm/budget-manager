import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

export default function AddItemDropdown() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);

  function handleClose() {
    setAnchor(null);
  }

  return (
    <>
      <div>
        <Button
          endIcon="+"
          onClick={(e) => setAnchor(e.target as HTMLElement)}
          id="basic-button"
          variant="contained"
          //   aria-controls={`${open ? "basic-menu" : ""}`}
          //   aria-expanded={`${open ? "true" : ""}`}
          //   aria-haspopup="true"
        >
          <Typography>Add</Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchor}
          open={open}
          onClick={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Bruh</MenuItem>
        </Menu>
      </div>
    </>
  );
}

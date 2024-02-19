import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setModal } from "../redux/slices/modalSlice";
import AddYearComponent from "./AddYearComponent";

export default function AddItemDropdown() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);
  const dispatch = useAppDispatch();

  function handleClose() {
    setAnchor(null);
  }

  return (
    <>
      <div>
        <Button
          endIcon="+"
          onClick={(e) => setAnchor(e.target as HTMLElement)}
          variant="contained"
          sx={{
            textTransform: "none",
          }}
        >
          Add...
        </Button>
        <Menu anchorEl={anchor} open={open} onClick={handleClose}>
          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(
                setModal({ open: true, component: <AddYearComponent /> })
              );
            }}
          >
            Year
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

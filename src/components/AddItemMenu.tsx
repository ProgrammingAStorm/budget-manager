import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setModal } from "../redux/slices/modalSlice";

export default function AddItemMenu() {
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
              dispatch(setModal({ open: true, component: "year" }));
            }}
          >
            Year
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(setModal({ open: true, component: "category" }));
            }}
          >
            Category
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(setModal({ open: true, component: "subCategory" }));
            }}
          >
            SubCategory
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(setModal({ open: true, component: "transaction" }));
            }}
          >
            Transaction
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

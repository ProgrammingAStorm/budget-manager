import {
  Menu,
  MenuItem,
  IconButton,
  ListSubheader,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
      <IconButton
        onClick={(e) => setAnchor(e.target as HTMLElement)}
        sx={{
          textTransform: "none",
        }}
      >
        <AddIcon />
      </IconButton>
      <Menu anchorEl={anchor} open={open} onClick={handleClose}>
        <ListSubheader>
          <Typography sx={{ textDecoration: "underline" }}>
            Transaction
          </Typography>
        </ListSubheader>
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

        <ListSubheader>
          <Typography sx={{ textDecoration: "underline" }}>Budget</Typography>
        </ListSubheader>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(setModal({ open: true, component: "budget" }));
          }}
        >
          Budget
        </MenuItem>
      </Menu>
    </>
  );
}

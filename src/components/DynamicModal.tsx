import { Modal, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setModal } from "../redux/slices/modalSlice";
import AddYearComponent from "./AddYearComponent";

export default function DynamicModal() {
  const { open, component } = useAppSelector((s) => s.modal);
  const dispatch = useAppDispatch();

  function pickElement() {
    switch (component) {
      case "year":
        return <AddYearComponent />;

      default:
        return <div></div>;
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => dispatch(setModal({ open: false, componenet: null }))}
    >
      <Paper
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {pickElement()}
      </Paper>
    </Modal>
  );
}

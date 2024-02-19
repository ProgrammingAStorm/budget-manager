import { Modal, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setModal } from "../redux/slices/modalSlice";

export default function DynamicModal() {
  const { open, component } = useAppSelector((s) => s.modal);
  const dispatch = useAppDispatch();

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
        {component}
      </Paper>
    </Modal>
  );
}

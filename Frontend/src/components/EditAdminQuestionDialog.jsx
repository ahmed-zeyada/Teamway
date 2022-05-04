import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditAdminQuestion from "./EditAdminQuestion";
import { useState } from "react";

const EditAdminQuestionDialog = ({ question, onClose }) => {
  const [openEdit, setOpenEdit] = useState(true);

  const closeEditModal = () => {
    setOpenEdit(false);
    onClose();
  };

  return (
    <Dialog open={openEdit} onClose={closeEditModal} maxWidth="lg" fullWidth>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent>
        <EditAdminQuestion
          adminQuestion={question}
          onComplete={closeEditModal}
        />
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default EditAdminQuestionDialog;

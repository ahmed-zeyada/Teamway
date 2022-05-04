import { Box, IconButton, Typography } from "@mui/material";
import EditAdminQuestionDialog from "./EditAdminQuestionDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { deleteAsyncAdminQuestion } from "../features/adminQuestionSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const AdminQuestion = ({ question }) => {
  const dispatch = useDispatch();
  const removeQuestion = () => {
    dispatch(deleteAsyncAdminQuestion(question.id));
  };
  const [openEdit, setOpenEdit] = useState(false);
  const editQuestion = () => {
    setOpenEdit(true);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };

  return (
    <>
      {openEdit ? (
        <EditAdminQuestionDialog question={question} onClose={closeEditModal} />
      ) : (
        <></>
      )}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ overflowWrap: "anywhere" }}>
              {question.text}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                width: "10%",
                marginRight: "10px",
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: "blue",
                  "&:hover": { backgroundColor: "darkBlue" },
                  color: "white",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  editQuestion();
                }}
              >
                <EditIcon></EditIcon>
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "red",
                  "&:hover": { backgroundColor: "darkRed" },
                  color: "white",
                  marginLeft: "10px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeQuestion();
                }}
              >
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {question.answers.map((a, i) => (
            <Typography key={i}>{a.text}</Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AdminQuestion;

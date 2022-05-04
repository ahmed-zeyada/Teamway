import { useSelector, useDispatch } from "react-redux";
import AdminQuestion from "../components/AdminQuestion";
import { useState, useEffect } from "react";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchAsyncAdminQuestions } from "../features/adminQuestionSlice";
import { fetchAsyncAdminPersonalityTraits } from "../features/adminPersonalityTraitSlice";
import EditAdminQuestionDialog from "../components/EditAdminQuestionDialog";
import AdminTrait from "../components/AdminTrait";

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncAdminQuestions());
    dispatch(fetchAsyncAdminPersonalityTraits());
  }, [dispatch]);

  const adminQuestion = useSelector((state) => state.adminQuestion);
  const adminTraits = useSelector((state) => state.adminPersonalityTrait);
  const [openEdit, setOpenEdit] = useState(false);

  const openAddModal = () => {
    setOpenEdit(true);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="h6">Admin Settings</Typography>
      <Typography variant="body2">
        Add test questions and answers, provide score for each answer
      </Typography>

      <Box
        sx={{
          width: "100%",
        }}
      >
        {adminQuestion.loadingQuestions ? (
          <Typography sx={{ textAlign: "center" }} variant="h6">
            Loading...
          </Typography>
        ) : (
          adminQuestion.questions.map((x) => (
            <AdminQuestion question={x} key={x.id}></AdminQuestion>
          ))
        )}
      </Box>
      {adminQuestion.loadingQuestionsError ? (
        <Box
          sx={{
            marginTop: "5px",
            width: "90%",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "red",
            backgroundColor: "#ffadad",
            color: "red",
            padding: "5px",
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            {adminQuestion.loadingQuestionsError}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Please ensure backend server is running on localhost port 5000
          </Typography>
        </Box>
      ) : (
        <></>
      )}

      <Tooltip title="add question">
        <div>
          <IconButton
            size="large"
            sx={{
              backgroundColor: "blue",
              "&:hover": { backgroundColor: "darkBlue" },
              color: "white",
              marginTop: "10px",
            }}
            onClick={() => openAddModal()}
          >
            <AddIcon></AddIcon>
          </IconButton>
        </div>
      </Tooltip>
      {openEdit ? <EditAdminQuestionDialog onClose={closeEditModal} /> : <></>}
      <hr></hr>
      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderTopWidth: "1px",
          borderTopColor: "gray",
          borderTopStyle: "solid",
        }}
      ></Box>
      <Typography sx={{ marginTop: "5px", marginBottom: "30px" }} variant="h6">
        this is read only settings for personality traits, each has score range
        and text as a result
      </Typography>
      {adminTraits.loading ? (
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Loading...
        </Typography>
      ) : (
        adminTraits.traits.map((x) => (
          <AdminTrait trait={x} key={x.id}></AdminTrait>
        ))
      )}
    </Box>
  );
};

export default Admin;

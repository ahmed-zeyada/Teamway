import { Box, Typography, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { postAsyncCreateSession } from "../features/testSessionSlice";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fullNameInput = useRef();
  const sessionInput = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const startNewTest = async () => {
    const fullName = fullNameInput.current.value;

    if (!fullName.trim()) {
      setError("name is required!");
      return;
    }
    setError("");
    try {
      setLoading(true);
      const response = await dispatch(
        postAsyncCreateSession({ fullName: fullName.trim() })
      ).unwrap();
      navigate(`test?sessionId=${response.sessionId}`);
    } catch (e) {
      setError(
        `${e.statusText}, Please ensure backend server is running on localhost port 5000`
      );
    } finally {
      setLoading(false);
    }
  };

  const continueTest = () => {
    const sessionId = sessionInput.current.value;
    if (!sessionId.trim()) {
      setError("sessionId is required!");
      return;
    }
    navigate(`test?sessionId=${sessionId.trim()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        spacing: "0",
        flexDirection: "column",
        minHeight: "50vh",
        margin: "10px",
      }}
    >
      <Typography variant="h4">
        Are you an introvert or an extrovert ?
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Let's find out!</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Typography variant="h6">Enter your name</Typography>
          <TextField
            inputRef={fullNameInput}
            sx={{ backgroundColor: "white", marginLeft: "5px" }}
          ></TextField>
          <Button
            disabled={loading}
            onClick={() => startNewTest()}
            sx={{ marginLeft: "10px" }}
            variant="contained"
            color="info"
          >
            Start Test
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Typography variant="h6">Already have session ? </Typography>
          <TextField
            inputRef={sessionInput}
            sx={{ backgroundColor: "white", marginLeft: "5px" }}
          ></TextField>
          <Button
            onClick={() => continueTest()}
            sx={{ marginLeft: "10px" }}
            variant="contained"
            color="info"
          >
            Continue Test
          </Button>
        </Box>
      </Box>
      {error ? (
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
          <Typography sx={{ textAlign: "center" }}>{error}</Typography>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Welcome;

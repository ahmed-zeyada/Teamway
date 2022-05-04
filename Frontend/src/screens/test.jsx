import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncSession } from "../features/testSessionSlice";
import TestQuestion from "../components/TestQuestion";
import TestAnswersMenu from "../components/TestAnswersMenu";
import TestResult from "../components/TestResult";

const Test = () => {
  const dispatch = useDispatch();
  const searchParam = new URLSearchParams(window.location.search);
  const sessionId = searchParam.get("sessionId")?.trim();
  const invalidSessionId = !sessionId?.trim();
  const testSession = useSelector((state) => state.testSession);

  useEffect(() => {
    if (!invalidSessionId && testSession?.sessionId !== sessionId) {
      dispatch(fetchAsyncSession(sessionId));
    }
  }, [dispatch, sessionId]);

  if (invalidSessionId)
    return (
      <>
        <Typography>Invalid Session</Typography>
      </>
    );

  if (testSession.error.status === 404)
    return (
      <>
        <Typography>Session does not exist</Typography>
      </>
    );

  if (testSession.error.text)
    return (
      <>
        <Typography>{testSession.error.text}</Typography>
      </>
    );

  if (!testSession.sessionId) {
    return <Typography>Loading...</Typography>;
  }

  if (!Object.keys(testSession.userAnswers).length) {
    return (
      <Typography>Admin did not add any questions for this session</Typography>
    );
  }

  if (testSession.completed)
    return <TestResult testSession={testSession}></TestResult>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5px",
          borderBottomStyle: "solid",
          borderBottomColor: "gray",
          borderBottomWidth: "1px",
        }}
      >
        <Typography variant="body">
          This is your sessionId:[{sessionId}], please copy it and use it to
          continue the test if you closed the browser.
        </Typography>
        <Typography variant="body">
          Your answers will be synced to backend whenever you visit new question
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: "5px" }}>
        <Grid item md={2}>
          <Box
            sx={{
              maxHeight: "78vh",
              minHeight: "78vh",
              overflowY: "auto",
              borderRightStyle: "solid",
              borderRightWidth: "2px",
              borderRightColor: "gray",
            }}
          >
            <TestAnswersMenu></TestAnswersMenu>
          </Box>
        </Grid>
        <Grid item md={10}>
          <TestQuestion testSession={testSession}></TestQuestion>
        </Grid>
      </Grid>
    </>
  );
};

export default Test;

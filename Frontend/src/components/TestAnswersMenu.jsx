import { Typography, Box, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion } from "../features/testQuestionSlice";

const TestAnswersMenu = ({ sessionId }) => {
  const dispatch = useDispatch();

  const userAnswers = useSelector((state) => state.testSession.userAnswers);
  const testQuestion = useSelector((state) => state.testQuestion);
  const questionCount = testQuestion.questions.length;
  const currentIndex = testQuestion.currentIndex;
  const setQuestion = (questionId) => dispatch(setCurrentQuestion(questionId));

  return (
    <Stack spacing={1} sx={{ paddingLeft: "5px", paddingRight: "5px" }}>
      {[...Array(questionCount).keys()].map((i) => (
        <Paper
          onClick={() => setQuestion(i)}
          sx={{
            borderWidth: currentIndex === i ? "1px" : "0",
            borderStyle: "solid",
            cursor: "pointer",
            backgroundColor:
              userAnswers[testQuestion.questions[i].id] != null
                ? "lightGreen"
                : "white",
          }}
          key={i}
          elevation={currentIndex === i ? 7 : 0}
        >
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "5px" }}
          >
            <Typography variant="h6"> Question {i + 1}</Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default TestAnswersMenu;

import {
  Typography,
  Box,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import api from "../common/api";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAnswers,
  putAsyncCommitSession,
} from "../features/testSessionSlice";
import {
  fetchAsyncTestQuestions,
  nextQuestion,
  prevQuestion,
} from "../features/testQuestionSlice";

const TestQuestion = ({ testSession }) => {
  const dispatch = useDispatch();
  const sessionId = testSession.sessionId;
  const testQuestion = useSelector((state) => state.testQuestion);
  const currentQuestion = testQuestion.currentQuestion;
  const currentAnswer = currentQuestion
    ? testSession.userAnswers[currentQuestion.id] ?? -1
    : -1;

  const readyToSubmit = Object.keys(testSession.userAnswers).every(
    (key) => testSession.userAnswers[key] != null
  );

  const onAnswerChange = (key) => {
    dispatch(
      updateAnswers({
        questionId: currentQuestion.id,
        answerKey: +key,
      })
    );
  };

  const loadNextQuestion = () => dispatch(nextQuestion());
  const loadPrevQuestion = () => dispatch(prevQuestion());
  const finishTest = () =>
    dispatch(
      putAsyncCommitSession({
        sessionId: sessionId,
        userAnswers: testSession.userAnswers,
      })
    );

  useEffect(() => {
    dispatch(fetchAsyncTestQuestions(sessionId));
  }, [dispatch, sessionId]);

  const userAnswersCopy = useRef(testSession.userAnswers);

  const userAnswersEquals = () => {
    return Object.keys(testSession.userAnswers).every(
      (key) => userAnswersCopy.current[key] === testSession.userAnswers[key]
    );
  };

  useEffect(() => {
    if (!userAnswersEquals()) {
      console.log("chang");
      userAnswersCopy.current = { ...testSession.userAnswers };
      api.put(`test/personality/session/${sessionId}`, {
        userAnswers: userAnswersCopy.current,
      });
    }
  }, [testQuestion.currentIndex]);

  if (testQuestion.error.text)
    return (
      <>
        <Typography>{testQuestion.error.tex}</Typography>
      </>
    );
  if (testQuestion.loading) {
    return (
      <>
        <Typography>Loading..</Typography>
      </>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Button
          disabled={testQuestion.currentIndex === 0}
          variant="contained"
          onClick={() => loadPrevQuestion()}
        >
          Prev
        </Button>
        <Typography sx={{ marginLeft: "20px" }} variant="h5">
          Question {testQuestion.currentIndex + 1}
        </Typography>

        <Button
          disabled={
            testQuestion.currentIndex === testQuestion.questions.length - 1
          }
          variant="contained"
          onClick={() => loadNextQuestion()}
          sx={{ marginLeft: "20px" }}
        >
          Next
        </Button>
      </Box>

      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h6">{currentQuestion?.text}</Typography>
        <RadioGroup
          value={currentAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
        >
          {currentQuestion?.answers.map((answer) => (
            <FormControlLabel
              key={answer.key}
              value={answer.key}
              control={<Radio />}
              label={answer.value}
            />
          ))}
        </RadioGroup>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => finishTest()}
          disabled={!readyToSubmit}
          color="success"
          variant="contained"
        >
          Finish Test
        </Button>
      </Box>
    </Box>
  );
};

export default TestQuestion;

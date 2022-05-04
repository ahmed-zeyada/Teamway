import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import EditAdminQuestionScore from "./EditAdminQuestionScore";
import { postAsyncAdminQuestion } from "../features/adminQuestionSlice";

const EditAdminQuestion = ({ adminQuestion, onComplete }) => {
  const dispatch = useDispatch();

  adminQuestion = adminQuestion ?? {
    id: 0,
    text: "",
    answers: [],
  };

  const [question, setQuestion] = useState(adminQuestion);
  const [errors, setErrors] = useState("");
  const addAnswer = () => {
    setQuestion((question) => {
      return {
        ...question,
        answers: [...question.answers, { text: "", score: 0 }],
      };
    });
  };
  const removeAnswer = (index) => {
    let answers = [...question.answers];
    answers.splice(index, 1);
    setQuestion((question) => {
      return { ...question, answers: [...answers] };
    });
  };

  const [addAnswerEnabld, setAddAnswerEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hasEmptyAnswer = question.answers.some((x) => !x.text.trim());

    setAddAnswerEnabled(!hasEmptyAnswer);
  }, [question]);

  const updateAnswer = (index, text) => {
    let answers = [...question.answers];
    answers[index] = { ...answers[index], text: text };
    setQuestion((question) => {
      return { ...question, answers: [...answers] };
    });
  };

  const updateQuestion = (text) => {
    setQuestion((question) => {
      return { ...question, text: text };
    });
  };

  const onCancel = () => onComplete();
  const onSave = () => {
    const errors = validate();
    if (!errors) {
      setErrors("");
      saveQuestion();
      return;
    }
    setErrors(errors);
  };

  const saveQuestion = async () => {
    try {
      setSaving(true);
      await dispatch(postAsyncAdminQuestion(question)).unwrap();
      onComplete();
    } catch (e) {
      setErrors(e.message);
    } finally {
      setSaving(false);
    }
  };

  const validate = () => {
    if (!question.text.trim()) return "question text is required";
    if (!question.answers || !question.answers.length)
      return "question must have at least 1 answer";
    if (question.answers.some((x) => !x.text.trim()))
      return "empty answer is not allowed";
    if (question.answers.some((x) => !x.score))
      return "each answer must have score higher than 0";
  };

  const onScoreChange = (index, score) => {
    let answers = [...question.answers];
    answers[index] = { ...answers[index], score: score };
    setQuestion((question) => {
      return { ...question, answers: [...answers] };
    });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TextField
        multiline
        error={!question.text.trim()}
        label="question"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ width: "100%", marginTop: "10px" }}
        value={question.text}
        onChange={(e) => updateQuestion(e.target.value)}
      ></TextField>

      <fieldset style={{ borderRadius: "4px" }}>
        <legend>answers</legend>
        {question.answers.map((x, i) => {
          return (
            <Box key={i}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  error={!x.text.trim()}
                  multiline
                  sx={{ marginRight: "10px", width: "100%", marginTop: "10px" }}
                  value={x.text}
                  onChange={(e) => updateAnswer(i, e.target.value)}
                ></TextField>

                <IconButton
                  sx={{
                    backgroundColor: "red",
                    "&:hover": { backgroundColor: "darkRed" },
                    color: "white",
                    marginTop: "10px",
                  }}
                  onClick={() => removeAnswer(i)}
                >
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <EditAdminQuestionScore
                  score={x.score}
                  onChange={(x) => onScoreChange(i, x)}
                />
              </Box>
            </Box>
          );
        })}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title={!addAnswerEnabld ? "fill all answers" : "add answer"}>
            <div>
              <IconButton
                disabled={!addAnswerEnabld}
                sx={{
                  backgroundColor: "blue",
                  "&:hover": { backgroundColor: "darkBlue" },
                  color: "white",
                  marginTop: "10px",
                }}
                onClick={() => addAnswer()}
              >
                <AddIcon></AddIcon>
              </IconButton>
            </div>
          </Tooltip>
        </Box>
      </fieldset>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          margin: "5px",
        }}
      >
        <Typography sx={{ color: "red", flex: "auto" }} variant="subtitle1">
          {errors}
        </Typography>
        <Button
          disabled={saving}
          size="large"
          sx={{ margin: "5px" }}
          variant="contained"
          color="success"
          onClick={() => onSave()}
        >
          Save
        </Button>
        <Button
          onClick={() => onCancel()}
          size="medium"
          sx={{ margin: "5px" }}
          variant="contained"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditAdminQuestion;

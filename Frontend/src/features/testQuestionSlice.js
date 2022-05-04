import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../common/api";

export const fetchAsyncTestQuestions = createAsyncThunk(
  "testQuestionSlice/fetchAsyncTestQuestions",
  async (sessionId) => {
    const response = await api.get(
      `test/personality/session/${sessionId}/questions/`
    );
    return response.data;
  }
);

const initialState = {
  questions: [],
  currentIndex: 0,
  currentQuestion: null,
  loading: false,
  error: "",
};

export const testQuestionSlice = createSlice({
  name: "testSession",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      const nextIndex =
        state.currentIndex < state.questions.length - 1
          ? state.currentIndex + 1
          : state.currentIndex;

      return {
        ...state,
        currentIndex: nextIndex,
        currentQuestion: state.questions[nextIndex],
      };
    },
    prevQuestion: (state) => {
      const prevIndex = state.currentIndex > 0 ? state.currentIndex - 1 : 0;
      return {
        ...state,
        currentIndex: prevIndex,
        currentQuestion: state.questions[prevIndex],
      };
    },
    setCurrentQuestion: (state, param) => {
      const currentIndex =
        param.payload >= 0 && param.payload <= state.questions.length - 1
          ? param.payload
          : state.currentIndex;

      return {
        ...state,
        currentIndex: currentIndex,
        currentQuestion: state.questions[currentIndex],
      };
    },
  },
  extraReducers: {
    [fetchAsyncTestQuestions.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchAsyncTestQuestions.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        questions: payload,
        currentQuestion: payload[0],
        loading: false,
        error: "",
      };
    },
    [fetchAsyncTestQuestions.rejected]: (state, e) => {
      return {
        ...state,
        loading: false,
        error: e.error.message,
      };
    },
  },
});
export const { nextQuestion, prevQuestion, setCurrentQuestion } =
  testQuestionSlice.actions;

export default testQuestionSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../common/api";

export const fetchAsyncAdminQuestions = createAsyncThunk(
  "adminQuestions/fetchAsyncAdminQuestions",
  async () => {
    const response = await api.get("test/personality/admin/questions");
    return response.data;
  }
);

export const postAsyncAdminQuestion = createAsyncThunk(
  "adminQuestions/postAsyncAdminQuestion",
  async (payload) => {
    const response = await api.post("test/personality/admin/question", payload);
    response.data.oldId = payload.id;
    return response.data;
  }
);

export const deleteAsyncAdminQuestion = createAsyncThunk(
  "adminQuestions/deleteAsyncAdminQuestion",
  async (questionId) => {
    const response = await api.delete(
      `test/personality/admin/question/${questionId}`
    );
    response.data = { id: questionId };
    return response.data;
  }
);

const initialState = {
  questions: [],
  loadingQuestions: false,
  loadingQuestionsError: "",
  savingQuestion: false,
  savingQuestionError: "",
  deletingQuestion: false,
  deletingQuestionError: "",
};

export const adminQuestionSlice = createSlice({
  name: "adminQuestion",
  initialState,
  extraReducers: {
    [fetchAsyncAdminQuestions.pending]: (state) => {
      return { ...state, loadingQuestions: true };
    },
    [fetchAsyncAdminQuestions.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        questions: payload,
        loadingQuestions: false,
        loadingQuestionsError: "",
      };
    },
    [fetchAsyncAdminQuestions.rejected]: (state, e) => {
      return {
        ...state,
        loadingQuestions: false,
        loadingQuestionsError: e.error.message,
      };
    },

    [postAsyncAdminQuestion.pending]: (state) => {
      return { ...state, savingQuestion: true };
    },
    [postAsyncAdminQuestion.fulfilled]: (state, { payload }) => {
      const savedQuestions = state.questions.filter(
        (x) => x.id !== payload.oldId
      );
      return {
        ...state,
        questions: [...savedQuestions, payload],
        savingQuestion: false,
        savingQuestionError: "",
      };
    },
    [postAsyncAdminQuestion.rejected]: (state, e) => {
      return {
        ...state,
        savingQuestion: false,
        savingQuestionError: e.error.message,
      };
    },

    [deleteAsyncAdminQuestion.pending]: (state) => {
      return { ...state, deletingQuestion: true };
    },
    [deleteAsyncAdminQuestion.fulfilled]: (state, { payload }) => {
      const savedQuestions = state.questions.filter((x) => x.id !== payload.id);
      return {
        ...state,
        questions: [...savedQuestions],
        sdeletingQuestion: false,
        deletingQuestionError: "",
      };
    },
    [deleteAsyncAdminQuestion.rejected]: (state, e) => {
      return {
        ...state,
        deletingQuestion: false,
        deletingQuestionError: e.error.message,
      };
    },
  },
});

export default adminQuestionSlice.reducer;

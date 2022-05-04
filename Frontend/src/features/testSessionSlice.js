import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../common/api";

export const postAsyncCreateSession = createAsyncThunk(
  "testSession/postAsyncCreateSession",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("test/personality/session", payload);
      return response.data;
    } catch (err) {
      const responseStatusText = err.response.statusText
        ? err.response.statusText
        : err.message;
      return rejectWithValue({
        statusText: responseStatusText,
        status: err.response.status,
      });
    }
  }
);

export const putAsyncCommitSession = createAsyncThunk(
  "testSession/putAsyncCommitSession",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `test/personality/session/${payload.sessionId}/commit`,
        payload
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        statusText: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const fetchAsyncSession = createAsyncThunk(
  "testSession/fetchAsyncSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`test/personality/session/${sessionId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        statusText: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

const initialState = {
  fullName: "",
  sessionId: "",
  completed: false,
  userAnswers: {},
  result: "",
  loading: false,
  error: {},
};

export const testSessionSlice = createSlice({
  name: "testSession",
  initialState,
  reducers: {
    updateAnswers: (state, param) => {
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [param.payload.questionId.toString()]: param.payload.answerKey,
        },
      };
    },
  },
  extraReducers: {
    [postAsyncCreateSession.pending]: (state) => {
      return { ...state, loading: true };
    },
    [postAsyncCreateSession.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        loading: false,
        error: {},
      };
    },
    [postAsyncCreateSession.rejected]: (state, e) => {
      return {
        ...state,
        loading: false,
        error: {
          text: e.payload.statusText,
          status: e.payload.status,
        },
      };
    },

    [putAsyncCommitSession.pending]: (state) => {
      return { ...state, loading: true };
    },
    [putAsyncCommitSession.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        loading: false,
        error: {},
      };
    },
    [putAsyncCommitSession.rejected]: (state, e) => {
      return {
        ...state,
        loading: false,
        error: {
          text: e.payload.statusText,
          status: e.payload.status,
        },
      };
    },

    [fetchAsyncSession.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchAsyncSession.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        loading: false,
        error: {},
      };
    },
    [fetchAsyncSession.rejected]: (state, e) => {
      return {
        ...state,
        loading: false,
        error: {
          text: e.payload.statusText,
          status: e.payload.status,
        },
      };
    },
  },
});

export const { updateAnswers } = testSessionSlice.actions;

export default testSessionSlice.reducer;

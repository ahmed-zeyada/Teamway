import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../common/api";

export const fetchAsyncAdminPersonalityTraits = createAsyncThunk(
  "AdminPersonalityTraits/fetchAsyncAdminPersonalityTraits",
  async () => {
    const response = await api.get("test/personality/admin/traits");
    return response.data;
  }
);

const initialState = {
  traits: [],
  error: "",
  loading: false,
};

export const adminPersonalityTraitSlice = createSlice({
  name: "adminPersonalityTrait",
  initialState,
  extraReducers: {
    [fetchAsyncAdminPersonalityTraits.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchAsyncAdminPersonalityTraits.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        traits: payload,
        loading: false,
        error: "",
      };
    },
    [fetchAsyncAdminPersonalityTraits.rejected]: (state, e) => {
      return {
        ...state,
        loading: false,
        error: e.error.message,
      };
    },
  },
});

export default adminPersonalityTraitSlice.reducer;

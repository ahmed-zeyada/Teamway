import { configureStore } from "@reduxjs/toolkit";
import adminQuestionReducer from "./adminQuestionSlice";
import testSessionReducer from "./testSessionSlice";
import testQuestionReducer from "./testQuestionSlice";
import adminPersonalityTraitReducer from "./adminPersonalityTraitSlice";

export const store = configureStore({
  reducer: {
    adminQuestion: adminQuestionReducer,
    adminPersonalityTrait: adminPersonalityTraitReducer,
    testSession: testSessionReducer,
    testQuestion: testQuestionReducer,
  },
});

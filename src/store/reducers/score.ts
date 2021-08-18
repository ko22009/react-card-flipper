import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/reducers";

function getTime(): number {
  const record = localStorage.getItem("record");
  if (record) {
    return +record;
  }
  return 0;
}

const initialState: {
  time: number;
} = {
  time: getTime(),
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    scoreSet: function (state, action) {
      return {
        time: action.payload,
      };
    },
  },
});

export const getScore = (state: RootState) => state.score.time;
export const { scoreSet } = scoreSlice.actions;
export const score = scoreSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/reducers";

const initialState = {
  time: 0,
  paused: true,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    timerStartCountdown: function (state, action: PayloadAction<number>) {
      return {
        ...state,
        time: action.payload,
        paused: false,
      };
    },
    timerStart: function (state, action: PayloadAction<number>) {
      return {
        ...state,
        time: action.payload,
        paused: false,
      };
    },
    timerUpdate: function (state, action: PayloadAction<number>) {
      return {
        ...state,
        time: action.payload,
      };
    },
    timerPause: function (state) {
      return {
        ...state,
        paused: true,
      };
    },
    timerOverCountdown: function (state) {
      return {
        ...state,
        paused: true,
      };
    },
    timerOver: function (state) {
      return {
        ...state,
        paused: true,
      };
    },
  },
});

export const getTime = (state: RootState) => state.timer.time;
export const getPaused = (state: RootState) => state.timer.paused;
export const {
  timerStartCountdown,
  timerStart,
  timerUpdate,
  timerPause,
  timerOverCountdown,
  timerOver,
} = timerSlice.actions;
export const timer = timerSlice.reducer;

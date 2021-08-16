import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/reducers";

export const TIME_COUNTDOWN = 5;
export const TIME_OVER_COUNTDOWN = TIME_COUNTDOWN * 1000 + 1000;

const initialState = {
  time: 0,
  paused: true,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    timerStartCountdown: function (state, action) {
      return {
        ...state,
        time: action.payload,
        paused: true,
      };
    },
    timerStart: function (state, action) {
      return {
        ...state,
        time: action.payload,
        paused: false,
      };
    },
    timerUpdate: function (state, action) {
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

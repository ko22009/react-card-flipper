import { useDispatch, useSelector } from "react-redux";
import {
  timerPause,
  timerStart,
  getTime,
  timerStartCountdown,
} from "@/store/reducers/timer";
import Board from "@/components/Board";
import Timer from "@/components/Timer";
import React from "react";

function BestScore() {
  return null;
}

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "30px",
};

function Game() {
  const dispatch = useDispatch();
  const time = useSelector(getTime);
  return (
    <div style={rootStyle}>
      <Board />
      <div>
        <Timer />
        <BestScore />
        <button
          onClick={() => {
            dispatch(timerStartCountdown(5));
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            dispatch(timerPause());
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            dispatch(timerStart(time));
          }}
        >
          Resume
        </button>
        <button
          onClick={() => {
            dispatch(timerStart(0));
          }}
        >
          Start timer
        </button>
      </div>
    </div>
  );
}

export default Game;

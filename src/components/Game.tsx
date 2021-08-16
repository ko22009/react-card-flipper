import { useDispatch, useSelector } from "react-redux";
import {
  timerPause,
  timerStart,
  getTime,
  timerStartCountdown,
  getPaused,
  TIME_COUNTDOWN,
} from "@/store/reducers/timer";
import Board from "@/components/Board";
import Timer from "@/components/Timer";
import React from "react";

function BestScore() {
  return <span>Ваш рекорд: 0</span>;
}

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "30px",
};

function Game() {
  const dispatch = useDispatch();
  const paused = useSelector(getPaused);
  const time = useSelector(getTime);
  return (
    <div style={rootStyle}>
      <Board />
      <div>
        <Timer />
        <BestScore />
        <button
          data-testid="start"
          onClick={() => {
            dispatch(timerStartCountdown(TIME_COUNTDOWN));
          }}
        >
          {paused ? "Start" : "New game"}
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

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
import Timer, { formatTime } from "@/components/Timer";
import React, { CSSProperties } from "react";
import { getScore } from "@/store/reducers/score";

const bestScoreStyle = {
  border: "1px solid",
  borderRadius: "2px",
  padding: "5px 10px",
  marginBottom: "5px",
  display: "inline-flex",
};

function BestScore() {
  const score = useSelector(getScore);
  return <div style={bestScoreStyle}>Ваш рекорд: {formatTime(score)}</div>;
}

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "30px",
};

const headerStyle: CSSProperties = {
  textAlign: "center",
  background: "rgb(41 41 66)",
  color: "#fff",
  padding: "10px",
  marginBottom: "15px",
};

function Game() {
  const dispatch = useDispatch();
  const time = useSelector(getTime);
  const paused = useSelector(getPaused);
  const btnPause = (
    <button
      onClick={() => {
        dispatch(timerPause());
      }}
    >
      ⏸️
    </button>
  );
  const btnResume = (
    <button
      onClick={() => {
        dispatch(timerStart(time));
      }}
    >
      ▶️
    </button>
  );
  return (
    <>
      <header style={headerStyle}>Card flipper</header>
      <div style={rootStyle}>
        <Board />
        <div>
          <Timer />
          <BestScore />
          <br />
          <button
            data-testid="start"
            onClick={() => {
              dispatch(timerStartCountdown(TIME_COUNTDOWN));
            }}
          >
            🔄️
          </button>{" "}
          {paused ? btnResume : btnPause}
        </div>
      </div>
    </>
  );
}

export default Game;

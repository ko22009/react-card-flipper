import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import React from "react";

function formatTime(second: number): string {
  const hours = Math.floor(second / 60);
  return (
    hours.toFixed().padStart(2, "0") +
    ":" +
    (second - hours * 60).toFixed().padStart(2, "0")
  );
}

function Timer() {
  const time = useSelector((state: RootState) => state.timer.time);
  return <div>{formatTime(time)}</div>;
}

export default Timer;

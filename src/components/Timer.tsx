import { useSelector } from "react-redux";
import React from "react";
import { getTime } from "@/store/reducers/timer";

const style = {
  border: "1px solid black",
  marginBottom: "5px",
  borderRadius: "3px",
  width: "60px",
  height: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export function formatTime(second: number): string {
  const hours = Math.floor(second / 60);
  return (
    hours.toFixed().padStart(2, "0") +
    ":" +
    (second - hours * 60).toFixed().padStart(2, "0")
  );
}

function Timer() {
  const time = useSelector(getTime);
  return <div style={style}>{formatTime(time)}</div>;
}

export default Timer;

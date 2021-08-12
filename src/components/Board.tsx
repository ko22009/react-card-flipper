import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import Card from "@/components/Card";
import React from "react";

const styleBoard = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 100px)",
  gridTemplateRows: "repeat(6, 100px)",
  columnGap: "15px",
  rowGap: "15px",
};

function Board() {
  const { cards } = useSelector((state: RootState) => state.cards);
  return (
    <div style={styleBoard}>
      {cards.map((card, i) => (
        <Card key={i} index={i} value={card.value} />
      ))}
    </div>
  );
}

export default Board;

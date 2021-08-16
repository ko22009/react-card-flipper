import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import Card from "@/components/Card";
import React from "react";
import { COUNT_PAIRS } from "@/store/reducers/cards";

const styleBoard = {
  display: "grid",
  gridTemplateColumns: `repeat(${COUNT_PAIRS}, 100px)`,
  gridTemplateRows: `repeat(${COUNT_PAIRS}, 100px)`,
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

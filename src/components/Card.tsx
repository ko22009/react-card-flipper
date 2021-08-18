import { CSSProperties } from "react";
import {
  cardsFlip,
  getActiveCard,
  getOpenedCards,
  getPreload,
  ICard,
} from "@/store/reducers/cards";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getPaused } from "@/store/reducers/timer";

const styleCard = {
  background: "#272773",
  color: "#fff",
  transition: "transform 1s",
  transformStyle: "preserve-3d" as "preserve-3d",
  width: "100%",
  height: "100%",
};

const styleScene = {
  perspective: "600px",
};

const styleFace: CSSProperties = {
  display: "inline-grid",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  height: "100%",
  width: "100%",
  fontSize: "30px",
  backfaceVisibility: "hidden",
};

const styleFaceBack: CSSProperties = {
  background: "#e41c60",
  transform: "rotateY(180deg)",
};

const styleFlip = {
  transform: "rotateY(-180deg)",
};

function Card(props: ICard) {
  const dispatch = useDispatch();
  const preload = useSelector(getPreload);
  const paused = useSelector(getPaused);
  const active_card = useSelector(getActiveCard);
  const open_cards = useSelector(getOpenedCards);
  let style = {};
  if (preload || active_card === props.index || open_cards[props.index]) {
    style = styleFlip;
  }
  function onClick(index: number) {
    dispatch(cardsFlip(index));
  }

  return (
    <div style={styleScene}>
      <div
        style={{ ...styleCard, ...style }}
        data-index={props.index}
        data-testid={"card_" + props.index}
        onClick={() => !paused && onClick(props.index)}
      >
        <div style={{ ...styleFace }} />
        <div style={{ ...styleFace, ...styleFaceBack }}>{props.value}</div>
      </div>
    </div>
  );
}

export default Card;

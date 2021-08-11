import { CSSProperties } from "react";
import { ICard } from "@/store/reducers/cards";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import React from "react";

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
  // const active = useSelector((state: RootState) => state.cards.active);
  // const activated = useSelector((state: RootState) => state.cards.activated);
  let style = {};
  //if (active === props.index || activated[props.index]) {
  //  style = styleFlip;
  // }
  //function onClick(index: number) {
  //   dispatch(flip(index));
  // }

  return (
    <div style={styleScene}>
      <div
        style={{ ...styleCard, ...style }}
        data-index={props.index}
        // onClick={() => onClick(props.index)}
      >
        <div style={{ ...styleFace }} />
        <div style={{ ...styleFace, ...styleFaceBack }}>{props.value}</div>
      </div>
    </div>
  );
}

export default Card;

import { combineReducers } from "redux";
import { cards } from "@/store/reducers/cards";
import { timer } from "@/store/reducers/timer";
import { score } from "@/store/reducers/score";

export const reducers = combineReducers({ cards, timer, score });
export type RootState = ReturnType<typeof reducers>;

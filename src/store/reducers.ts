import { combineReducers } from "redux";
import { cards } from "@/store/reducers/cards";
import { timer } from "@/store/reducers/timer";

export const reducers = combineReducers({ cards, timer });
export type RootState = ReturnType<typeof reducers>;

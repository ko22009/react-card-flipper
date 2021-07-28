import { combineReducers } from "redux";
import { Counter } from "./counterReducer";

export const rootReducer = combineReducers({ Counter });
export type RootState = ReturnType<typeof rootReducer>;

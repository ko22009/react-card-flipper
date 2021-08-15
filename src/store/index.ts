import createSagaMiddleware from "redux-saga";
import { reducers } from "@/store/reducers";

export const sagaMiddleware = createSagaMiddleware();

export const store = {
  reducer: reducers,
  middleware: [sagaMiddleware],
};

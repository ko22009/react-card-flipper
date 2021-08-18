import createSagaMiddleware from "redux-saga";
import { reducers } from "@/store/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { rootSaga } from "@/store/sagas";

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

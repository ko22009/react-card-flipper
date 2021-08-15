import { fork } from "redux-saga/effects";
import countdownWatcher from "./sagas/countdownWatcher";
import timerWatcher from "@/store/sagas/timerWatcher";
import timerCountdownSwitcherWatcher from "./sagas/timerCountdownSwitcherWatcher";
import cardsWatcher from "@/store/sagas/cardsWatcher";

export function* rootSaga() {
  yield fork(countdownWatcher);
  yield fork(timerWatcher);
  yield fork(timerCountdownSwitcherWatcher);
  yield fork(cardsWatcher);
}

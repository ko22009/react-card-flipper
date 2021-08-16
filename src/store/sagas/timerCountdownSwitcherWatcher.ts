import { put, take } from "redux-saga/effects";
import {
  timerOver,
  timerOverCountdown,
  timerStart,
  timerStartCountdown,
} from "@/store/reducers/timer";

export default function* timerCountdownSwitcherWatcher() {
  while (true) {
    const { type } = yield take([
      timerStart,
      timerStartCountdown,
      timerOverCountdown,
    ]);
    if (type === timerOverCountdown.type) {
      yield put(timerStart(1));
    } else if (type === timerStart.type) {
      yield put(timerOverCountdown());
    } else {
      yield put(timerOver());
    }
  }
}

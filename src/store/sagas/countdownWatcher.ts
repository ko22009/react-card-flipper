import { END, eventChannel, SagaIterator } from "redux-saga";
import { call, cancel, cancelled, fork, put, take } from "redux-saga/effects";
import {
  timerOverCountdown,
  timerStart,
  timerStartCountdown,
  timerUpdate,
} from "@/store/reducers/timer";

const count = (seconds: number) =>
  eventChannel((emit) => {
    const timer = setInterval(() => {
      emit(--seconds >= 0 ? seconds : END);
    }, 1000);
    return () => clearInterval(timer);
  });

function* countdownWorker(seconds: number): SagaIterator {
  const chan = yield call(count, seconds);
  try {
    while (true) {
      const seconds = yield take(chan);
      yield put(timerUpdate(seconds));
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    } else {
      yield put(timerOverCountdown());
    }
  }
}

export default function* countdownWatcher(): SagaIterator {
  let task;
  while (true) {
    const { payload, type } = yield take([
      timerStartCountdown,
      timerOverCountdown,
    ]);
    if (task) {
      yield cancel(task);
    }
    if (type === timerStartCountdown.type) {
      task = yield fork(countdownWorker, payload);
    }
  }
}

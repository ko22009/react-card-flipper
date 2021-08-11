import { eventChannel, SagaIterator } from "redux-saga";
import { call, cancel, cancelled, fork, put, take } from "redux-saga/effects";
import {
  timerOver,
  timerOverCountdown,
  timerPause,
  timerStart,
  timerUpdate,
} from "@/store/reducers/timer";

const count = (seconds: number) =>
  eventChannel((emit) => {
    const timer = setInterval(() => {
      emit(++seconds);
    }, 1000);
    return () => clearInterval(timer);
  });

function* timerWorker(seconds: number): SagaIterator {
  const chan = yield call(count, seconds);
  try {
    while (true) {
      const seconds = yield take(chan);
      yield put(timerUpdate(seconds));
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}

export default function* timerWatcher(): SagaIterator {
  let task;
  while (true) {
    const { type, payload } = yield take([timerPause, timerStart, timerOver]);
    if (task) {
      yield cancel(task);
    }
    if (type === timerStart.type) {
      task = yield fork(timerWorker, payload);
    }
  }
}

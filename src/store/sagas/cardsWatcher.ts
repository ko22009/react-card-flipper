import { call, put, select, take } from "redux-saga/effects";
import {
  cardsFinish,
  cardsFlip,
  cardsFlipAfter,
  cardsGenerate,
  cardsMatch,
  cardsPlay,
  COUNT_PAIRS,
  getActiveCard,
  getCards,
  getOpenedCards,
  ICard,
} from "../reducers/cards";
import {
  getTime,
  timerOver,
  timerOverCountdown,
  timerStartCountdown,
} from "@/store/reducers/timer";
import shuffleArray from "@/utils/shuffleArray";
import { getScore, scoreSet } from "@/store/reducers/score";

export default function* cardsWatcher() {
  while (true) {
    const { type, payload } = yield take([
      timerStartCountdown,
      timerOverCountdown,
      cardsFlip,
      cardsFlipAfter,
    ]);
    if (type === timerStartCountdown.type) {
      let cards: [] = yield select(getCards);
      const shuffleArr: [] = yield call(shuffleArray, cards);
      yield put(cardsGenerate(shuffleArr));
    } else if (type === timerOverCountdown.type) {
      yield put(cardsPlay());
    } else if (type === cardsFlip.type) {
      const activeCardIndex: number = yield select(getActiveCard);
      const cards: ICard[] = yield select(getCards);
      if (
        activeCardIndex !== -1 &&
        activeCardIndex !== payload &&
        cards[activeCardIndex].index === cards[payload].index
      ) {
        yield put(cardsMatch(payload));
      }
      yield put(cardsFlipAfter(payload));
      const openedCards: {} = yield select(getOpenedCards);
      if (Object.keys(openedCards).length === COUNT_PAIRS * COUNT_PAIRS) {
        yield put(cardsFinish());
        yield put(timerOver());
        const time: number = yield select(getTime);
        const score: number = yield select(getScore);
        if (time < score) {
          localStorage.setItem("record", time.toString());
          yield put(scoreSet(time));
        }
      }
    }
  }
}

import { call, put, select, take } from "redux-saga/effects";
import {
  cardsFlip,
  cardsFlipAfter,
  cardsGenerate,
  cardsMatch,
  cardsPlay,
  getActiveCard,
  getCards,
  ICard,
} from "../reducers/cards";
import {
  timerOverCountdown,
  timerStartCountdown,
} from "@/store/reducers/timer";
import shuffleArray from "@/utils/shuffleArray";

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
    }
  }
}

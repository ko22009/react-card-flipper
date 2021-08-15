import { expectSaga } from "redux-saga-test-plan";
import cardsWatcher from "@/store/sagas/cardsWatcher";
import { timerStartCountdown } from "@/store/reducers/timer";
import { cardsGenerate, getCards } from "@/store/reducers/cards";
import { reducers } from "@/store/reducers";
import shuffleArray from "@/utils/shuffleArray";
import generateRange from "@/utils/generateRange";

describe("cards", () => {
  it("shuffle cards after countdown start", () => {
    const range = generateRange(1, 36);
    const shuffle = shuffleArray(range);
    return expectSaga(cardsWatcher)
      .withReducer(reducers)
      .dispatch(timerStartCountdown)
      .provide({
        select({ selector }, next) {
          if (selector === getCards) {
            return range;
          }
          return next();
        },
        call(effect, next) {
          if (effect.fn === shuffleArray) {
            return shuffle;
          }
          return next();
        },
      })
      .put(cardsGenerate(shuffle))
      .silentRun();
  });
});

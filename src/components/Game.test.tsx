import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import Game from "./Game";
import { Provider } from "react-redux";
import { store } from "@/store";
import { getTime, TIME_OVER_COUNTDOWN } from "@/store/reducers/timer";
import { COUNT_PAIRS, getCards, getOpenedCards } from "@/store/reducers/cards";

async function gameStarted() {
  jest.useFakeTimers();
  render(
    <Provider store={store}>
      <Game />
    </Provider>
  );
  const startBtn = await screen.findByTestId("start");
  fireEvent.click(startBtn);

  expect(store.getState().cards.active_card).toBe(-1);

  await waitFor(
    async () => {
      const time = await screen.findByText("00:00");
      expect(time).toBeInTheDocument();
    },
    { timeout: TIME_OVER_COUNTDOWN }
  );

  await waitForElementToBeRemoved(() => screen.queryByText("00:00"));
}

describe("card", () => {
  test("cannot flip card before start game", async () => {
    render(
      <Provider store={store}>
        <Game />
      </Provider>
    );
    const btn = await screen.findByTestId("card_1");
    fireEvent.click(btn);
    expect(store.getState().cards.active_card).toBe(-1);
  });

  test("can flip card after timer is gone", async () => {
    await gameStarted();

    const btn = await screen.findByTestId("card_1");
    fireEvent.click(btn);

    expect(store.getState().cards.active_card).toBe(1);
  });

  test("cannot flip when paused", async () => {
    await gameStarted();

    const btn = await screen.findByText("⏸️");
    fireEvent.click(btn);

    const card1 = await screen.findByTestId("card_1");
    fireEvent.click(card1);

    expect(store.getState().cards.active_card).toBe(-1);
  });

  test("pause timer", async () => {
    await gameStarted();

    const pauseBtn = await screen.findByText("⏸️");
    fireEvent.click(pauseBtn);

    const time = store.getState().timer.time;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const timeLaterBeforeResume = store.getState().timer.time;

    expect(timeLaterBeforeResume).toBe(time);
  });

  test("pause and resume timer", async () => {
    await gameStarted();

    const time = store.getState().timer.time;

    const pauseBtn = await screen.findByText("⏸️");
    fireEvent.click(pauseBtn);

    const btnResume = await screen.findByText("▶️");
    fireEvent.click(btnResume);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const timeLater = store.getState().timer.time;

    expect(timeLater).not.toBe(time);
  });

  test("finish game", async () => {
    await gameStarted();

    const cards = getCards(store.getState());
    const combineCards = cards.reduce((acc: any, card, i) => {
      if (!acc[card.index - 1]) {
        acc[card.index - 1] = [];
      }
      acc[card.index - 1].push(i);
      return acc;
    }, []);

    combineCards.forEach((card: number[][]) => {
      const card1 = screen.getByTestId("card_" + card[0]);
      const card2 = screen.getByTestId("card_" + card[1]);
      fireEvent.click(card1);
      fireEvent.click(card2);
    });
    const openedCards = getOpenedCards(store.getState());
    expect(Object.keys(openedCards).length).toBe(COUNT_PAIRS * COUNT_PAIRS);

    const time = getTime(store.getState());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const timeLater = getTime(store.getState());

    expect(timeLater).toBe(time);
  });
});

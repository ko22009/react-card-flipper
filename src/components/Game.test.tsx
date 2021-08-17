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
import { TIME_OVER_COUNTDOWN } from "@/store/reducers/timer";

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
    const { findByTestId } = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );
    const btn = await findByTestId("card_1");
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

    const btn = await screen.findByText("Pause");
    fireEvent.click(btn);

    const card1 = await screen.findByTestId("card_1");
    fireEvent.click(card1);

    expect(store.getState().cards.active_card).toBe(-1);
  });

  test("pause timer", async () => {
    await gameStarted();

    const pauseBtn = await screen.findByText("Pause");
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

    const pauseBtn = await screen.findByText("Pause");
    fireEvent.click(pauseBtn);

    const btnResume = await screen.findByText("Resume");
    fireEvent.click(btnResume);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const timeLater = store.getState().timer.time;

    expect(timeLater).not.toBe(time);
  });
});

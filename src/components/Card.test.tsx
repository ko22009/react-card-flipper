import { render, fireEvent, act, cleanup } from "@testing-library/react";
import React from "react";
import Game from "./Game";
import { Provider } from "react-redux";
import { store, sagaMiddleware } from "@/store";
import { configureStore } from "@reduxjs/toolkit";
import { rootSaga } from "@/store/sagas";

let appStore = configureStore(store);
sagaMiddleware.run(rootSaga);

afterEach(() => {
  cleanup();
  appStore = configureStore(store);
  sagaMiddleware.run(rootSaga);
});

describe("card", () => {
  test("cannot flip card before start timer", async () => {
    const { findByTestId } = render(
      <Provider store={appStore}>
        <Game />
      </Provider>
    );
    const btn = await findByTestId("card_1");
    fireEvent.click(btn);
    expect(appStore.getState().cards.active_card).toBe(-1);
  });

  test("can flip card after 5 seconds after start countdown", async () => {
    jest.useFakeTimers();
    const { findByTestId } = render(
      <Provider store={appStore}>
        <Game />
      </Provider>
    );
    const startBtn = await findByTestId("start");
    fireEvent.click(startBtn);

    expect(appStore.getState().cards.active_card).toBe(-1);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    const btn = await findByTestId("card_1");
    fireEvent.click(btn);

    expect(appStore.getState().cards.active_card).toBe(1);
  });

  test("cannot flip when paused", async () => {
    jest.useFakeTimers();
    const { findByTestId, findByText } = render(
      <Provider store={appStore}>
        <Game />
      </Provider>
    );
    const startBtn = await findByTestId("start");
    fireEvent.click(startBtn);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    const btn = await findByText("Pause");
    fireEvent.click(btn);

    const card1 = await findByTestId("card_1");
    fireEvent.click(card1);

    expect(appStore.getState().cards.active_card).toBe(-1);
  });

  test("resume game", async () => {
    jest.useFakeTimers();
    const { findByTestId, findByText } = render(
      <Provider store={appStore}>
        <Game />
      </Provider>
    );
    const startBtn = await findByTestId("start");
    fireEvent.click(startBtn);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    const pauseBtn = await findByText("Pause");
    fireEvent.click(pauseBtn);

    const time = appStore.getState().timer.time;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const timeLaterBeforeResume = appStore.getState().timer.time;

    expect(timeLaterBeforeResume).toBe(time);

    const btnResume = await findByText("Resume");
    fireEvent.click(btnResume);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const timeLater = appStore.getState().timer.time;

    expect(timeLater).not.toBe(time);
  });
});

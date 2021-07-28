import { render, cleanup, fireEvent } from "@testing-library/react";
import Auth from "./Auth";

afterEach(cleanup);

test("form doesn't open, visible only button action by default", () => {
  const { queryByText, queryByTestId } = render(<Auth />);
  const button = queryByText(/Show Modal/i);
  expect(button).toBeInTheDocument();

  const modal = queryByTestId("modal");
  expect(modal).not.toBeInTheDocument();
});

test("modal window is open and close after click close button", () => {
  const { queryByText, queryByTestId } = render(<Auth />);
  const button = queryByText(/Show Modal/i);
  fireEvent.click(button!);

  const modal = queryByTestId("modal");
  const close = queryByTestId("close");
  expect(close).toBeInTheDocument();
  fireEvent.click(close!);

  expect(modal).not.toBeInTheDocument();
});

test("modal window is open and close after click outside, not appear in modal body", () => {
  const { queryByText, queryByTestId } = render(<Auth />);
  const button = queryByText(/Show Modal/i);
  fireEvent.click(button!);

  const modal = queryByTestId("modal");
  const body = queryByTestId("body");
  fireEvent.click(body!);
  expect(modal).toBeInTheDocument();

  fireEvent.click(modal!);

  expect(modal).not.toBeInTheDocument();
});

test("modal window is open and close after submit the form", () => {
  const { queryByText, queryByTestId } = render(<Auth />);
  const button = queryByText(/Show Modal/i);
  fireEvent.click(button!);

  const modal = queryByTestId("modal");
  const submitButton = queryByTestId("onSubmit");
  fireEvent.click(submitButton!);

  expect(modal).not.toBeInTheDocument();
});

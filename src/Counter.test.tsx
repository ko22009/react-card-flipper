import React from "react";
import Counter from "./Counter";
import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

test("should increment the count by ten", () => {
  const { getByTestId } = render(<Counter />);
  const count = getByTestId("count");
  const button = getByTestId("button");
  expect(count).toHaveTextContent("0");
  fireEvent.click(button, { shiftKey: true });
  expect(count).toHaveTextContent("1");
});

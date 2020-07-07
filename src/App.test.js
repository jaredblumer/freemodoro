"use strict";

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import regeneratorRuntime from "regenerator-runtime";

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

test("Clicking start button triggers timer start", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(getByTestId("timer-button"));
  jest.advanceTimersByTime(1000);
  let display = getByTestId("timerDisplay");
  expect(display.textContent).toBe("24:59");
});

test("Clicking timer display resets timer after timer start", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(getByTestId("timer-button"));
  jest.advanceTimersByTime(1000);
  let display = getByTestId("timerDisplay");
  expect(display.textContent).toBe("24:59");
  fireEvent.click(getByTestId("timer-display"));
  expect(display.textContent).toBe("25:00");
});

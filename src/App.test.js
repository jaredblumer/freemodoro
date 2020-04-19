"use strict";

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

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

test("Clicking menu button opens and closes navigation menu", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("nav")).not.toBeVisible();
  fireEvent.click(getByTestId("menu-button"));
  expect(getByTestId("nav")).toBeVisible();
  fireEvent.click(getByTestId("menu-button"));
  expect(getByTestId("nav")).not.toBeVisible();
});

// test("Round increments on timer completion", () => {
//   const { getByTestId } = render(<App />);
//   expect(getByTestId("currentRound").innerHTML).toBe("0");
//   fireEvent.click(getByTestId("timer-button"));
//   jest.advanceTimersByTime(1600000);
//   expect(getByTestId("currentRound").innerHTML).toBe("1");
// });

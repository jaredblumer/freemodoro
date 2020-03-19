"use strict";

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pomodoro from "./Pomodoro";

jest.useFakeTimers();

test("Pressing button triggers timer start", () => {
  const { getByTestId } = render(<Pomodoro />);
  fireEvent.click(getByTestId("timer-button"));
  jest.advanceTimersByTime(1000);
  let display = getByTestId("timerDisplay");
  expect(display.textContent).toBe("24:59");
});

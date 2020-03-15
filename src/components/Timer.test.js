import React from "react";
import { render } from "@testing-library/react";
import Timer from "./Timer";

test("Display time remaining: 25:00", () => {
  const { getByTestId } = render(<Timer secondsRemaining={1500} />);
  expect(getByTestId("timerDisplay").textContent).toBe("25:00");
});

test("Display time remaining: 00:00", () => {
  const { getByTestId } = render(<Timer secondsRemaining={0} />);
  expect(getByTestId("timerDisplay").textContent).toBe("00:00");
});

test("Display time remaining: 23:52", () => {
  const { getByTestId } = render(<Timer secondsRemaining={1432} />);
  expect(getByTestId("timerDisplay").textContent).toBe("23:52");
});

test("Display time remaining: 00:23", () => {
  const { getByTestId } = render(<Timer secondsRemaining={23} />);
  expect(getByTestId("timerDisplay").textContent).toBe("00:23");
});

test("Display time remaining: 57:05", () => {
  const { getByTestId } = render(<Timer secondsRemaining={3425} />);
  expect(getByTestId("timerDisplay").textContent).toBe("57:05");
});

test("Display time remaining: 60:00", () => {
  const { getByTestId } = render(<Timer secondsRemaining={3600} />);
  expect(getByTestId("timerDisplay").textContent).toBe("60:00");
});

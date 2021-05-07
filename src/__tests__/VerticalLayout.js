import VerticalLayout from "../views/VerticalLayout";

import { localStorageMock } from "../__mocks__/localStorage.js";

import { screen } from "@testing-library/dom";

describe("GIVEN I am connected as Employee", () => {
  test("THEN icons should be rendered", () => {
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    const user = JSON.stringify({
      type: "Employee",
    });
    window.localStorage.setItem("user", user);

    const html = VerticalLayout(120);
    document.body.innerHTML = html;

    expect(screen.getByTestId("icon-window")).toBeTruthy();

    expect(screen.getByTestId("icon-mail")).toBeTruthy();
  });
});

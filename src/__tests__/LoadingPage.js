import LoadingPage from "../views/LoadingPage.js";

import { screen } from "@testing-library/dom";

describe("GIVEN I am connected on app (as an Employee or an HR admin)", () => {
  describe("WHEN LoadingPage is called", () => {
    test("THEN it should render Loading...", () => {
      const html = LoadingPage();
      document.body.innerHTML = html;
      
      expect(screen.getAllByText("Loading...")).toBeTruthy();
    });
  });
});

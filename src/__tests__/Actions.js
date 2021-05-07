import Actions from "../views/Actions.js";

import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

describe("GIVEN I am connected as an Employee", () => {
  describe("WHEN I am on Bills page and there are bills", () => {
    test("THEN, it should render icon eye", () => {
      const html = Actions();
      document.body.innerHTML = html;

      expect(screen.getByTestId("icon-eye")).toBeTruthy();
    });
  });

  describe("WHEN I am on Bills page and there are bills with url for file", () => {
    test("THEN, it should save given url in data-bill-url custom attribute", () => {
      const url = "/fake_url";
      const html = Actions(url);
      document.body.innerHTML = html;

      expect(screen.getByTestId("icon-eye")).toHaveAttribute(
        "data-bill-url",
        url
      );
    });
  });
});

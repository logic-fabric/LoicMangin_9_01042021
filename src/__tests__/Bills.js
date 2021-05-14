import Bills from "../containers/Bills.js";
import BillsUI from "../views/BillsUI.js";
import { convertToDate } from "../app/format.js";

import { bills } from "../fixtures/bills.js";
import { localStorageMock } from "../__mocks__/localStorage.js";

import { screen } from "@testing-library/dom";

describe("GIVEN I am connected as an employee", () => {
  describe("WHEN I am on Bills page", () => {
    test("THEN bill icon in vertical layout should be present", () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );

      const html = BillsUI({ data: [] });
      document.body.innerHTML = html;

      const billIcon = screen.getByTestId("icon-window");

      expect(billIcon).toBeTruthy();
    });

    test("THEN bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;

      const dates = screen
        .getAllByText(
          /^([1-9]|[12][0-9]|3[01]) (Jan|Fév|Mar|Avr|Mai|Jui|Aou|Sep|Oct|Nov|Déc). ((19|20)\d\d)$/
        )
        .map((a) => a.innerHTML);

      const antiChrono = (date1, date2) => {
        const d1 = convertToDate(date1);
        const d2 = convertToDate(date2);

        if (d1 < d2) return 1;
        if (d1 > d2) return -1;
        return 0;
      };
      const datesSorted = [...dates].sort(antiChrono);

      expect(dates).toEqual(datesSorted);
    });
  });

  describe("WHEN I am on Bills page and there are no bills", () => {
    test("THEN the bills table should be empty", () => {
      const html = BillsUI({ data: [] });
      document.body.innerHTML = html;

      const eyeIcon = screen.queryByTestId("icon-eye");

      expect(eyeIcon).toBeNull();
    });
  });

  describe("WHEN I am on Bills page but it is loading", () => {
    test("THEN Loading page should be rendered", () => {
      const html = BillsUI({ loading: true });
      document.body.innerHTML = html;

      expect(screen.getAllByText("Loading...")).toBeTruthy();
    });
  });

  describe("WHEN I am on Bills page but back-end send an error message", () => {
    test("THEN Error page should be rendrered", () => {
      const html = BillsUI({ error: "some error message" });
      document.body.innerHTML = html;

      expect(screen.getAllByText("Erreur")).toBeTruthy();
    });
  });
});

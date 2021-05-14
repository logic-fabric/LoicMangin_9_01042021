import Bills from "../containers/Bills.js";
import BillsUI from "../views/BillsUI.js";
import { convertToDate } from "../app/format.js";
import { ROUTES } from "../constants/routes.js";

import { bills } from "../fixtures/bills.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import firebase from "../__mocks__/firebase";

import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("GIVEN I am connected as Employee", () => {
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

      document.body.innerHTML = BillsUI({ data: [] });

      const billIcon = screen.getByTestId("icon-window");

      expect(billIcon).toBeTruthy();
    });

    test("THEN bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills });

      const dates = screen
        .getAllByText(
          /^([1-9]|[12][0-9]|3[01]) (Jan|Fév|Mar|Avr|Mai|Jui|Aou|Sep|Oct|Nov|Déc). ((19|20)\d\d)$/
        )
        .map((a) => a.innerHTML);

      const antiChrono = (date1, date2) => {
        const d1 = convertToDate(date1);
        const d2 = convertToDate(date2);

        if (d1 <= d2) return 1;
        if (d1 > d2) return -1;
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

  describe("WHEN I am on Bills page and I click on the new bill button", () => {
    test("THEN I should be sent to new bill page", () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );

      document.body.innerHTML = BillsUI({ bills });

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      const firestore = null;

      const billsContainer = new Bills({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage,
      });

      const handleClickNewBill = jest.fn(billsContainer.handleClickNewBill);
      const newBillButton = screen.getByTestId("btn-new-bill");
      newBillButton.addEventListener("click", handleClickNewBill);
      userEvent.click(newBillButton);

      expect(handleClickNewBill).toHaveBeenCalled();

      expect(screen.getByText("Envoyer une note de frais")).toBeTruthy();
    });
  });

  describe("WHEN I am on Bills page and I click on an icon eye", () => {
    test("THEN a modal should open", () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );

      document.body.innerHTML = BillsUI({ data: bills });

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      const firestore = null;

      const billsContainer = new Bills({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage,
      });

      const iconEye = screen.getByTestId("icon-eye47qAXb6fIm2zOKkLzMro");
      const handleClickIconEye = jest.fn(
        billsContainer.handleClickIconEye(iconEye)
      );
      iconEye.addEventListener("click", handleClickIconEye);
      userEvent.click(iconEye);

      expect(handleClickIconEye).toHaveBeenCalled();

      const modale = screen.getByTestId("modaleFile");

      expect(modale).toBeTruthy();
    });
  });
});

// Test d'intégration GET:
describe("GIVEN I am a user connected as Emplyee", () => {
  describe("WHEN I navigate to Bills page", () => {
    test("THEN it fetches bills from mock API GET", async () => {
      const getSpy = jest.spyOn(firebase, "get");
      const bills = await firebase.get();

      expect(getSpy).toHaveBeenCalledTimes(1);

      expect(bills.data.length).toBe(4);
    });

    test("THEN it fetches from an API and fails with 404 error message", async () => {
      firebase.get.mockImplementationOnce(() => {
        Promise.reject(new Error("Erreur 404"));
      });

      const html = BillsUI({ error: "Erreur 404" });
      document.body.innerHTML = html;

      const message = screen.getByText(/Erreur 404/);

      expect(message).toBeTruthy();
    });

    test("THEN it fetches from an API and fails with 500 error message", async () => {
      firebase.get.mockImplementationOnce(() => {
        Promise.reject(new Error("Erreur 500"));
      });

      const html = BillsUI({ error: "Erreur 500" });
      document.body.innerHTML = html;

      const message = screen.getByText(/Erreur 500/);

      expect(message).toBeTruthy();
    });
  });
});

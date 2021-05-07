import DashboardFormUI from "../views/DashboardFormUI.js";

import { formatDate } from "../app/format.js";

import { screen } from "@testing-library/dom";

const bill = {
  id: "47qAXb6fIm2zOKkLzMro",
  email: "a@a",
  type: "Hôtel et logement",
  name: "encore",
  date: "2004-04-04",
  amount: 400,
  pct: 20,
  vat: "80",
  fileName: "preview-facture-free-201801-pdf-1.jpg",
  fileUrl:
    "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
  commentary: "séminaire billed",
  status: "accepted",
  commentAdmin: "ok",
};

const billAccepted = {
  ...bill,
  status: "accepted",
};

const billPending = {
  ...bill,
  status: "pending",
};

const billrefused = {
  ...bill,
  status: "refused",
};

describe("GIVEN I am connected as an Admin and I am on Dashboard Page", () => {
  describe("WHEN bill data is passed to DashboardUI", () => {
    test("THEN it should display them in the page", () => {
      const html = DashboardFormUI(bill);
      document.body.innerHTML = html;

      expect(screen.getByText(bill.type)).toBeTruthy();

      expect(screen.getByText(bill.name)).toBeTruthy();

      expect(screen.getByText(formatDate(bill.date))).toBeTruthy();

      expect(screen.getByText(bill.amount.toString())).toBeTruthy();

      expect(screen.getByText(bill.pct.toString())).toBeTruthy();

      expect(screen.getByText(bill.vat)).toBeTruthy();

      expect(screen.getByText(bill.commentary)).toBeTruthy();

      expect(screen.getByText(bill.fileName)).toBeTruthy();
    });
  });

  describe("WHEN pending bill is passed to DashboardUI", () => {
    test("THEN it should show button and textArea", () => {
      const html = DashboardFormUI(billPending);
      document.body.innerHTML = html;

      expect(screen.getByText("Accepter")).toBeTruthy();

      expect(screen.getByText("Refuser")).toBeTruthy();

      expect(screen.getByTestId("commentary2")).toBeTruthy();
    });
  });

  describe("WHEN accepted bill is passed to DashboardUI", () => {
    test("THEN it should show admin commentary", () => {
      const html = DashboardFormUI(billAccepted);
      document.body.innerHTML = html;

      expect(screen.getByText(bill.commentAdmin)).toBeTruthy();
    });
  });

  describe("WHEN refuseded bill is passed to DashboardUI", () => {
    test("THEN it should show admin commentary", () => {
      const html = DashboardFormUI(billrefused);
      document.body.innerHTML = html;

      expect(screen.getByText(bill.commentAdmin)).toBeTruthy();
    });
  });
});

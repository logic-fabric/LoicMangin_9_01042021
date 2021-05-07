import { ROUTES, ROUTES_PATH } from "../constants/routes";

import { screen } from "@testing-library/dom";

const data = [];
const loading = false;
const error = null;

describe("GIVEN I am connected and I am on some page of the app", () => {
  describe("WHEN I navigate to Login page", () => {
    test("THEN it should render Login page", () => {
      const pathname = ROUTES_PATH["Login"];
      const html = ROUTES({
        pathname,
        data,
        loading,
        error,
      });
      document.body.innerHTML = html;

      expect(screen.getAllByText("Administration")).toBeTruthy();
    });
  });

  describe("WHEN I navigate to Bills page", () => {
    test("THEN it should render Bills page", () => {
      const pathname = ROUTES_PATH["Bills"];
      const html = ROUTES({
        pathname,
        data,
        loading,
        error,
      });
      document.body.innerHTML = html;

      expect(screen.getAllByText("Mes notes de frais")).toBeTruthy();
    });
  });

  describe("WHEN I navigate to NewBill page", () => {
    test("THEN it should render NewBill page", () => {
      const pathname = ROUTES_PATH["NewBill"];
      const html = ROUTES({
        pathname,
        data,
        loading,
        error,
      });
      document.body.innerHTML = html;

      expect(screen.getAllByText("Envoyer une note de frais")).toBeTruthy();
    });
  });

  describe("WHEN I navigate to Dashboard", () => {
    test("THEN it should render Dashboard page", () => {
      const pathname = ROUTES_PATH["Dashboard"];
      const html = ROUTES({
        pathname,
        data,
        loading,
        error,
      });
      document.body.innerHTML = html;

      expect(screen.getAllByText("Validations")).toBeTruthy();
    });
  });

  describe("WHEN I navigate to anywhere else other than Login, Bills, NewBill, Dashboard", () => {
    test("THEN it should render Loginpage", () => {
      const pathname = "/anywhere-else";
      const html = ROUTES({
        pathname,
        data,
        loading,
        error,
      });
      document.body.innerHTML = html;

      expect(screen.getAllByText("Administration")).toBeTruthy();
    });
  });
});

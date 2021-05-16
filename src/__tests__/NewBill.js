import NewBill from "../containers/NewBill.js";
import NewBillUI from "../views/NewBillUI.js";
import { ROUTES } from "../constants/routes.js";

import { localStorageMock } from "../__mocks__/localStorage.js";

import { fireEvent, screen } from "@testing-library/dom";

describe("GIVEN I am connected as an Employee", () => {
  describe("WHEN I am on NewBill page and I submit a correct form", () => {
    test("THEN I should be redirected to Bills page", () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });

      const firestore = null;

      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );

      document.body.innerHTML = NewBillUI();

      const newBillContainer = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage,
      });

      const handleSubmit = jest.fn(newBillContainer.handleSubmit);
      newBillContainer.fileName = "image.jpg";

      const newBillForm = screen.getByTestId("form-new-bill");
      newBillForm.addEventListener("submit", handleSubmit);
      fireEvent.submit(newBillForm);

      expect(handleSubmit).toHaveBeenCalled();

      expect(screen.getAllByText("Mes notes de frais")).toBeTruthy();
    });
  });
});

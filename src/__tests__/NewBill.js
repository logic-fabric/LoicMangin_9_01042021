import NewBill from "../containers/NewBill.js";
import BillsUI from "../views/BillsUI.js";
import NewBillUI from "../views/NewBillUI.js";
import { ROUTES } from "../constants/routes.js";

import { localStorageMock } from "../__mocks__/localStorage.js";
import firebase from "../__mocks__/firebase.js";

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

  describe("WHEN I am on NewBill page and I choose a file that is not JPG, JPEG or PNG", () => {
    test("THEN the filename error message should appears", () => {
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

      const handleChangeFile = jest.fn(newBillContainer.handleChangeFile);

      const fileInput = screen.getByTestId("file");
      fileInput.addEventListener("change", handleChangeFile);
      fireEvent.change(fileInput, {
        target: {
          files: [
            new File(["document.pdf"], "document.pdf", {
              type: "application/pdf",
            }),
          ],
        },
      });

      expect(handleChangeFile).toHaveBeenCalled();

      const errorMessage = screen.getByText(/JPG, JPEG ou PNG uniquement/i);

      expect(errorMessage).toBeTruthy();
    });
  });

  describe("WHEN I am on NewBill page and I choose a file that is JPG, JPEG or PNG", () => {
    test("THEN the filename error message should not appears", () => {
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

      const handleChangeFile = jest.fn(newBillContainer.handleChangeFile);

      const fileInput = screen.getByTestId("file");
      fileInput.addEventListener("change", handleChangeFile);
      fireEvent.change(fileInput, {
        target: {
          files: [new File(["image.png"], "image.png", { type: "image/png" })],
        },
      });

      expect(handleChangeFile).toHaveBeenCalled();

      const errorMessage = screen.getByText(/JPG, JPEG ou PNG uniquement/i);

      expect(errorMessage).toBeFalsy();
    });
  });
});

// Test d'intégration POST:
describe("GIVEN I am a user connected as Employee", () => {
  describe("WHEN I navigate to New Bill and post a new bill", () => {
    test("THEN number of bills feteched from mock API GET increases by 1", async () => {
      const postSpy = jest.spyOn(firebase, "post");
      const billToPost = {
        id: "47qAXb6fIm2zOKkLzMro",
        email: "a@a",
        type: "Hôtel et logement",
        name: "Bill 1 from bills fixture",
        date: "4 Avr. 2004",
        amount: 400,
        pct: 20,
        vat: "80",
        fileName: "preview-facture-free-201801-pdf-1.jpg",
        fileUrl:
          "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
        commentary: "séminaire billed",
        status: "pending",
        commentAdmin: "ok",
      };
      const bills = await firebase.post(billToPost);

      expect(postSpy).toHaveBeenCalledTimes(1);

      expect(bills.data.length).toBe(5);
    });

    test("THEN it posts to API and fails with 500 message error on Bills page", async () => {
      firebase.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      );

      const html = BillsUI({ error: "Erreur 500" });
      document.body.innerHTML = html;

      const message = screen.getByText(/Erreur 500/);

      expect(message).toBeTruthy();
    });
  });
});

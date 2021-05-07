import Logout from "../containers/Logout.js";
import DashboardUI from "../views/DashboardUI.js";
import { ROUTES } from "../constants/routes";

import { localStorageMock } from "../__mocks__/localStorage.js";

import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

const bills = [
  {
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
    status: "pending",
    commentAdmin: "ok",
  },
];

describe("GIVEN I am connected", () => {
  describe("WHEN I click on log out button", () => {
    test("THEN I should be sent to login page", () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Admin",
        })
      );

      document.body.innerHTML = DashboardUI({ bills });

      const logout = new Logout({ document, onNavigate, localStorage });
      const handleClick = jest.fn(logout.handleClick);

      const disco = screen.getByTestId("layout-disconnect");
      disco.addEventListener("click", handleClick);
      userEvent.click(disco);

      expect(handleClick).toHaveBeenCalled();

      expect(screen.getByText("Administration")).toBeTruthy();
    });
  });
});

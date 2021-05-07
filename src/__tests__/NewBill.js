import NewBill from "../containers/NewBill.js";
import NewBillUI from "../views/NewBillUI.js";

//import { screen } from "@testing-library/dom";

describe("GIVEN I am connected as an employee", () => {
  describe("WHEN I am on NewBill Page", () => {
    test("THEN ...", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;

      // TO DO: write tests
    });
  });
});

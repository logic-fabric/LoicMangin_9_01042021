import Logout from "./Logout.js";

import { convertToDate, formatDate, formatStatus } from "../app/format.js";
import { ROUTES_PATH } from "../constants/routes.js";

export default class Bills {
  constructor({ document, onNavigate, firestore, localStorage }) {
    this.document = document;
    this.onNavigate = onNavigate;
    this.firestore = firestore;

    const buttonNewBill = document.querySelector(
      `button[data-testid="btn-new-bill"]`
    );

    if (buttonNewBill) {
      buttonNewBill.addEventListener("click", this.handleClickNewBill);
    }

    const iconEye = document.querySelectorAll(`[data-bill-url]`);

    if (iconEye) {
      iconEye.forEach((icon) => {
        icon.addEventListener("click", (e) => this.handleClickIconEye(icon));
      });
    }

    new Logout({ document, localStorage, onNavigate });
  }

  handleClickNewBill = (e) => {
    this.onNavigate(ROUTES_PATH["NewBill"]);
  };

  handleClickIconEye = (icon) => {
    const billUrl = icon.getAttribute("data-bill-url");
    const imgWidth = Math.floor($("#modaleFile").width() * 0.5);

    $("#modaleFile")
      .find(".modal-body")
      .html(
        `<div style='text-align: center;'><img width=${imgWidth} src=${billUrl} /></div>`
      );

    if (typeof $("#modaleFile").modal === "function")
      $("#modaleFile").modal("show");
  };

  // No need to cover this function by tests:
  getBills = () => {
    const userEmail = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).email
      : "";

    if (this.firestore) {
      return this.firestore
        .bills()
        .get()
        .then((snapshot) => {
          const bills = snapshot.docs
            .map((doc) => ({
              ...doc.data(),
              date: formatDate(doc.data().date),
              status: formatStatus(doc.data().status),
            }))
            .filter((bill) => bill.email === userEmail);

          return bills;
        })
        .catch((error) => error);
    }
  };
}

export const sortBillsByDate = (bills) => {
  const billsCopy = [...bills];

  billsCopy.sort((bill1, bill2) => {
    const date1 = convertToDate(bill1.date);
    const date2 = convertToDate(bill2.date);

    if (date1 <= date2) return 1;
    if (date1 > date2) return -1;
  });

  return billsCopy;
};

import Logout from "./Logout.js";

import { ROUTES_PATH } from "../constants/routes.js";

export default class NewBill {
  constructor({ document, onNavigate, firestore, localStorage }) {
    this.document = document;
    this.onNavigate = onNavigate;
    this.firestore = firestore;

    const formNewBill = this.document.querySelector(
      `form[data-testid="form-new-bill"]`
    );
    formNewBill.addEventListener("submit", this.handleSubmit);

    const file = this.document.querySelector(`input[data-testid="file"]`);
    file.addEventListener("change", this.handleChangeFile);

    this.fileUrl = null;
    this.fileName = null;

    new Logout({ document, localStorage, onNavigate });
  }

  handleChangeFile = (e) => {
    const file = this.document.querySelector(`input[data-testid="file"]`)
      .files[0];
    const filePath = file.name.split(/\\/g);
    const fileName = filePath[filePath.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExt = fileNameParts[fileNameParts.length - 1];

    const errorMessage = document.querySelector(
      '[data-testid="file-error-message"]'
    );

    if (["jpg", "jpeg", "png"].includes(fileExt.toLowerCase())) {
      errorMessage.classList.remove("show");
      errorMessage.textContent = "";

      if (this.firestore) {
        this.firestore.storage
          .ref(`justificatifs/${fileName}`)
          .put(file)
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then((url) => {
            this.fileUrl = url;
            this.fileName = fileName;
          });
      }
    } else {
      e.target.value = "";

      errorMessage.textContent = "Fichier JPG, JPEG ou PNG uniquement";
      errorMessage.classList.add("show");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const email = JSON.parse(localStorage.getItem("user")).email;
    const bill = {
      email,
      type: e.target.querySelector(`select[data-testid="expense-type"]`).value,
      name: e.target.querySelector(`input[data-testid="expense-name"]`).value,
      amount: parseInt(
        e.target.querySelector(`input[data-testid="amount"]`).value
      ),
      date: e.target.querySelector(`input[data-testid="datepicker"]`).value,
      vat: e.target.querySelector(`input[data-testid="vat"]`).value,
      pct:
        parseInt(e.target.querySelector(`input[data-testid="pct"]`).value) ||
        20,
      commentary: e.target.querySelector(`textarea[data-testid="commentary"]`)
        .value,
      fileUrl: this.fileUrl,
      fileName: this.fileName,
      status: "pending",
    };
    this.createBill(bill);
    this.onNavigate(ROUTES_PATH["Bills"]);
  };

  // No need to cover this function by tests
  createBill = (bill) => {
    if (this.firestore) {
      this.firestore
        .bills()
        .add(bill)
        .then(() => {
          this.onNavigate(ROUTES_PATH["Bills"]);
        })
        .catch((error) => error);
    }
  };
}

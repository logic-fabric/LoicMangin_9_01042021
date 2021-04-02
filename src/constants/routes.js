import loginView from "../views/loginView.js";

const ROUTES_PATH = {
  login: "/",
  bills: "#emplyee/bills",
  newBill: "#employee/bill/new",
  dashboard: "#admin/dashboard",
};

export const ROUTES = ({ pathname, data, error, loading }) => {
  switch (pathname) {
    case ROUTES_PATH["login"]:
      return loginView();
    case ROUTES_PATH["bills"]:
      return "TO DO";
    case ROUTES_PATH["newBill"]:
      return "TO DO";
    case ROUTES_PATH["dashboard"]:
      return "TO DO";
  }
};

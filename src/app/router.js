import { ROUTES } from "../constants/routes.js";

export default function Router() {
  const root = document.getElementById("root");
  root.innerHTML = ROUTES({ pathname: window.location.pathname });

  window.onNavigate = (pathname) => {
    
  }
}

import VerticalLayout from "./VerticalLayout.js";

export default function LoadingPage() {
  return `
    <div class='layout'>
      ${VerticalLayout()}
      <div class='content' id='loading'>
        Loading...
      </div>
    </div>`;
}

const FRENCH_MONTHS = {
  "Jan.": 0,
  "Fév.": 1,
  "Mar.": 2,
  "Avr.": 3,
  "Mai.": 4,
  "Jui.": 5,
  "Jui.": 6,
  "Aoû.": 7,
  "Sep.": 8,
  "Oct.": 9,
  "Nov.": 10,
  "Déc.": 11,
};

export const formatDate = (dateStr) => {
  // QUICK HACK: to handle invalid data coming from Firestore:
  const [y, m, d] = dateStr.split("-");

  if (y.length !== 4) return "date invalide";

  // TO DO: check the date before sending data to Firestore

  const date = new Date(dateStr);

  const year = new Intl.DateTimeFormat("fr", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("fr", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("fr", { day: "2-digit" }).format(date);

  const capMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${parseInt(day)} ${capMonth.substr(0, 3)}. ${year
    .toString()
    .substr(2, 4)}`;
};

export const convertToDate = (formatedDate) => {
  let [day, month, year] = formatedDate.split(" ");

  year = parseInt(year);
  month = FRENCH_MONTHS[month];
  day = parseInt(day);

  return new Date(year, month, day);
};

export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "accepted":
      return "Accepté";
    case "refused":
      return "Refusé";
  }
};

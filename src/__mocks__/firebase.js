export default {
  get: () => {
    return Promise.resolve({
      data: [
        {
          id: "47qAXb6fIm2zOKkLzMro",
          email: "a@a",
          type: "Hôtel et logement",
          name: "Bill 1 from Firebase mock",
          date: "2004-04-04",
          amount: 400,
          vat: "80",
          pct: 20,
          fileName: "preview-facture-free-201801-pdf-1.jpg",
          fileUrl:
            "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
          commentary: "séminaire billed",
          status: "pending",
          commentAdmin: "ok",
        },
        {
          id: "BeKy5Mo4jkmdfPGYpTxZ",
          email: "a@a",
          type: "Transports",
          name: "Bill 2 from Firebase mock",
          date: "2001-01-01",
          amount: 100,
          pct: 20,
          vat: "",
          fileName: "1592770761.jpeg",
          fileUrl:
            "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…61.jpeg?alt=media&token=7685cd61-c112-42bc-9929-8a799bb82d8b",
          commentary: "plop",
          status: "refused",
          commentAdmin: "en fait non",
        },
        {
          id: "UIUZtnPQvnbFnB0ozvJh",
          email: "a@a",
          type: "Services en ligne",
          name: "Bill 3 from Firebase mock",
          date: "2003-03-03",
          amount: 300,
          pct: 20,
          vat: "60",
          fileName:
            "facture-client-php-exportee-dans-document-pdf-enregistre-sur-disque-dur.png",
          fileUrl:
            "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…dur.png?alt=media&token=571d34cb-9c8f-430a-af52-66221cae1da3",
          commentary: "",
          status: "accepted",
          commentAdmin: "bon bah d'accord",
        },
        {
          id: "qcCK3SzECmaZAGRrHjaC",
          email: "a@a",
          type: "Restaurants et bars",
          name: "Bill 4 from Firebase mock",
          date: "2002-02-02",
          amount: 200,
          pct: 20,
          vat: "40",
          fileName: "preview-facture-free-201801-pdf-1.jpg",
          fileUrl:
            "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=4df6ed2c-12c8-42a2-b013-346c1346f732",
          commentary: "test2",
          status: "refused",
          commentAdmin: "pas la bonne facture",
        },
      ],
    });
  },
};

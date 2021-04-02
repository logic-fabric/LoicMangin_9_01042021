class Firestore {
  constructor() {
    this.store = window.firebase ? window.firebase.firestore() : () => null;
    this.storage = window.firebase ? window.firebase.storage() : () => null;
  }

  user(userId) {
    return this.store.doc(`users/${userId}`);
  }

  users() {
    return this.store.collection("users");
  }

  ref(path) {
    return this.store.doc(path);
  }

  bill(billId) {
    this.store.collection(`bills/${billId}`);
  }
}

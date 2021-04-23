class Firestore {
  constructor() {
    this.store = window.firebase ? window.firebase.firestore() : () => null;
    this.storage = window.firebase ? window.firebase.storage() : () => null;
  }

  bills() {
    return this.store.collection("bills");
  }

  bill(billId) {
    return this.store.doc(`bills/${billId}`);
  }

  ref(path) {
    return this.store.doc(path);
  }

  users() {
    return this.store.collection("users");
  }

  user(userId) {
    return this.store.doc(`users/${userId}`);
  }
}

export default new Firestore();

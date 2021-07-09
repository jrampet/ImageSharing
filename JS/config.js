var firebaseConfig = {
    apiKey: "AIzaSyBCeZcD9KL5BOq1U3ac9lkwiT57fxnyp2E",
    authDomain: "imagesharing-19e2a.firebaseapp.com",
    projectId: "imagesharing-19e2a",
    storageBucket: "imagesharing-19e2a.appspot.com",
    messagingSenderId: "148593405715",
    appId: "1:148593405715:web:5376c4596955b9309174e6"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = app.firestore();
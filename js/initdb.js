const firebaseConfig = {
    apiKey: "AIzaSyDGE1CgbFtYYwKwsOGJQnYckRSIGIiRdjo",
    authDomain: "superredpress.firebaseapp.com",
    databaseURL: "https://superredpress.firebaseio.com",
    projectId: "superredpress",
    storageBucket: "superredpress.appspot.com",
    messagingSenderId: "422438773510"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

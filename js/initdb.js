const firebaseConfig = {
    apiKey: "AIzaSyAbXrun_64uBTL3kuurmZwdy8d04OvY3p8",
    authDomain: "redpress-c6144.firebaseapp.com",
    databaseURL: "https://redpress-c6144.firebaseio.com",
    projectId: "redpress-c6144",
    storageBucket: "",
    messagingSenderId: "608049167412"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const firebaseConfig = {
    apiKey: "AIzaSyBY0oKVNpqZPw4gnqDzGA14TujAe68beuo",
    authDomain: "superpupermegapress.firebaseapp.com",
    databaseURL: "https://superpupermegapress.firebaseio.com",
    projectId: "superpupermegapress",
    storageBucket: "superpupermegapress.appspot.com",
    messagingSenderId: "858725543193"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

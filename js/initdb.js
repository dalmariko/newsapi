const firebaseConfig = {
    apiKey: "AIzaSyD6N_N0FHIcTyiN-6bCubaZ8d9H-OUHG6c",
    authDomain: "redpress-b2935.firebaseapp.com",
    databaseURL: "https://redpress-b2935.firebaseio.com",
    projectId: "redpress-b2935",
    storageBucket: "redpress-b2935.appspot.com",
    messagingSenderId: "502141343996"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

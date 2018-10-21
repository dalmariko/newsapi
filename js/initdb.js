const firebaseConfig = {
    apiKey: "AIzaSyCZx5hkr8uDlquO2rEKmlQa0mvHzHk6ssQ",
    authDomain: "project17-10-2018.firebaseapp.com",
    databaseURL: "https://project17-10-2018.firebaseio.com",
    projectId: "project17-10-2018",
    storageBucket: "project17-10-2018.appspot.com",
    messagingSenderId: "1096598129525"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

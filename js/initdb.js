const firebaseConfig = {
    apiKey: "AIzaSyAznFTYsXFPEJFVrLZl7GQBsxw6B84vdrY",
    authDomain: "enotwhynot.firebaseapp.com",
    databaseURL: "https://enotwhynot.firebaseio.com",
    projectId: "enotwhynot",
    storageBucket: "enotwhynot.appspot.com",
    messagingSenderId: "977756168043"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

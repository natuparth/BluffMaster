//import * as firebase from 'firebase';
import firebase from 'firebase/app';
//import firestore from 'firebase/firestore'

//const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCdBku9I5IdEQd8KwWpRFeouKHEOdWxZ_M",
    authDomain: "bluffmaster-a2df6.firebaseapp.com",
    databaseURL: "https://bluffmaster-a2df6.firebaseio.com",
    projectId: "bluffmaster-a2df6",
    storageBucket: "bluffmaster-a2df6.appspot.com",
    messagingSenderId: "815359838355",
    appId: "1:815359838355:web:460c81543534fd2c9d6566",
    measurementId: "G-RKSHSP1WL2"
};
firebase.initializeApp(config);



export default firebase;

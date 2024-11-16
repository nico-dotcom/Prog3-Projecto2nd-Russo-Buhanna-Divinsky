import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBajKuBkFIJBu9VZA7MtbCPEOvKSSfykLY",
    authDomain: "mi-primer-firebase-92d9a.firebaseapp.com",
    projectId: "mi-primer-firebase-92d9a",
    storageBucket: "mi-primer-firebase-92d9a.firebasestorage.app",
    messagingSenderId: "450937494904",
    appId: "1:450937494904:web:6fd5414b92e94fb6a7bc8d"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
  
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAnkaQniuECp_H-EMNCLq5tsyf0LNr-t7Q',
    authDomain: 'sea-properties-us.firebaseapp.com',
    projectId: 'sea-properties-us',
    storageBucket: 'sea-properties-us.appspot.com',
    messagingSenderId: '715977298465',
    appId: '1:715977298465:web:a9dd1339126d8b03c84960'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
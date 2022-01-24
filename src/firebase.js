import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBilXIUY_rfEWV92SxtsaWDFvmuxFAUVhA",
  authDomain: "danic0defirst-project.firebaseapp.com",
  projectId: "danic0defirst-project",
  storageBucket: "danic0defirst-project.appspot.com",
  messagingSenderId: "178456995731",
  appId: "1:178456995731:web:b23de612052561cba8ea66",
};
// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la base de datos
export const firestore = firebase.firestore();

//El modulo de autenticacion
export const auth = firebase.auth();
//El proveedor de autenticacion
export const provider = new firebase.auth.GoogleAuthProvider();
//La utilidad para hacer login con el pop-up
export const loginConGoogle = () => auth.signInWithPopup(provider);
//La utilidad para hacer el logout
export const logout = () => auth.signOut();

// Exporta el paquete firebase para otros usos
export default firebase;

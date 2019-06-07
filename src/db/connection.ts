import firebase from "firebase-admin"
import serviceAccount from "./token"

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount as object)
  })
}

export const db = firebase.firestore()

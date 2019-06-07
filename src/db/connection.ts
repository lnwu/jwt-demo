import admin from "firebase-admin"
import serviceAccount from "./token"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as object)
})

export const db = admin.firestore()

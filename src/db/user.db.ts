import { db } from "./connection"

const users = db.collection("users")

export const setLnwu = async () => {
  const existingLnwu = users.where("name", "==", "lnwu").get()
  if (!(await existingLnwu).empty) {
    const docId = (await existingLnwu).docs[0].id
    await users.doc(docId).delete()
  }
  users.add({
    name: "lnwu",
    email: "wind2729@gmail.com",
    password: "password"
  })
}

export const getUserById = async (id: string) => {
  const user = await users.doc(id).get()
  return user ? user.data() : null
}

export const updateUserById = async (id: string, userData: object) => {
  await users.doc(id).update(userData)
  return getUserById(id)
}

export const getUserIdByEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = users
    .where("email", "==", email)
    .where("password", "==", password)
    .get()
  if (!(await user).empty) {
    const matchedUser = (await user).docs[0]
    return matchedUser.id
  } else {
    return null
  }
}

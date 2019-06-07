import { db } from "./connection"

const users = db.collection("users")

export const setLnwu = () => {
  users.add({
    name: "lnwu"
  })
}

export const getUserById = async (id: string) => {
  const user = await users.doc(id).get()
  return user ? user.data() : null
}

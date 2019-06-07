import { db } from "./connection"

const users = db.collection("users")

export const setLnwu = () => {
  users.add({
    name: "lnwu"
  })
}

export const getUserById = (id: string) => {
  return id
}

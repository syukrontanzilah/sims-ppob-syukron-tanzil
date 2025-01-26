"use server"
import { cookies } from "next/headers";
import { IUserCookies } from "./loginUtils";
import { fetcherPpob } from "./fetchPpob";

// GET

export const getBalance = async () => {
  const url = `/balance`
  const userRaw = (await cookies()).get("user")?.value;
  const user: IUserCookies = JSON.parse(userRaw!);

  try {
    const response = await fetcherPpob({
      url,
      method: "GET",
      token: user.data.token
    })
    console.log('response balance->',response)
    return response.data
  } catch(error){
    console.error("Error nih!")
    throw error
  }
}
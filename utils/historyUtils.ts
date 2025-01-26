"use server"
import { cookies } from "next/headers";
import { IUserCookies } from "./loginUtils";
import { fetcherPpob } from "./fetchPpob";

// GET

export const getHistory = async (offset: number, limit: number) => {
  const url = `/transaction/history?offset=${offset}&limit=${limit}`
  const userRaw = (await cookies()).get("user")?.value;
  const user: IUserCookies = JSON.parse(userRaw!);

  try {
    const response = await fetcherPpob({
      url,
      method: "GET",
      token: user.data.token
    })
    console.log('response history->',response)
    return response
  } catch(error){
    console.error("Error nih!")
    throw error
  }
}
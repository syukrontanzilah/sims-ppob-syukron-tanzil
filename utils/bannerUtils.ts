"use server"
import { cookies } from "next/headers";
import { IUserCookies } from "./loginUtils";
import { fetcherPpob } from "./fetchPpob";

// GET

export const getBanner = async () => {
  const url = `/banner`
  const userRaw = (await cookies()).get("user")?.value;
  const user: IUserCookies = JSON.parse(userRaw!);

  try {
    const response = await fetcherPpob({
      url,
      method: "GET",
      token: user.data.token
    })
    console.log('response banner->',response)
    return response.data
  } catch(error){
    console.error("Error nih!")
    throw error
  }
}
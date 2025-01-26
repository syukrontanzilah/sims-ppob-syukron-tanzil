/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { cookies } from "next/headers";
import { IUserCookies } from "./loginUtils";
import { fetcherPpob } from "./fetchPpob";
import { customFetch } from "./customFetch";

// GET

export const getProfile = async () => {
  const url = `/profile`
  const userRaw = (await cookies()).get("user")?.value;
  const user: IUserCookies = JSON.parse(userRaw!);

  try {
    const response = await fetcherPpob({
      url,
      method: "GET",
      token: user.data.token
    })
    console.log('response profile->',response)
    return response.data
  } catch(error){
    console.error("Error nih!")
    throw error
  }
}

// UPDATE PROFILE

export const updateProfile = async (body: any) => {
  const url = `/profile/update`;
  const userRaw = (await cookies()).get("user")?.value;
  const user: IUserCookies = JSON.parse(userRaw!);

  try{
    const response = await fetcherPpob({
      url,
      method: "PUT",
      body,
      token: user.data.token
    })
    console.log('response profile update->',response)
    return response

  } catch(error){
    console.error("Error nih!")
    throw error
  }


}


// UPDATE IMAGE PROFILE

export const updateImageProfile = async (body:FormData) => {
  const url = `/profile/image`;
  const userRaw = (await cookies()).get("user")?.value;
  const user: IUserCookies = JSON.parse(userRaw!);

  const res = await customFetch({
    url,
    method: "PUT",
    body,
    token: user.data.token,
    isBodyForm: true,
  });

  return res

}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { cookies } from "next/headers";
import { IUserCookies } from "./loginUtils";
import { fetcherPpob } from "./fetchPpob";

//POST 

export const postTopUp = async (body:any) => {
    const url = `/topup`;
    const userRaw = (await cookies()).get("user")?.value;
    const user: IUserCookies = JSON.parse(userRaw!);

    const res = await fetcherPpob({
        url,
        method: "POST",
        body,
        token: user?.data.token
    })

    console.log("response topup",res)

    return res
}
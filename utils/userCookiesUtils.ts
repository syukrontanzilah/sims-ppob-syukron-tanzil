/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use server";

import { cookies } from "next/headers";
import { IUserCookies } from "./loginUtils";

export async function getUserDataCookies(): Promise<IUserCookies> {
  return JSON.parse((await cookies()).get("user")?.value!) ?? "no data";
}

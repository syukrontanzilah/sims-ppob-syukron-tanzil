/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axios from "axios";
// import Cookies from "js-cookie";
import { cookies } from "next/headers";

export interface IUserCookies {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

// LOGIN
export async function login(email: string, password: string) {
  const url = "https://take-home-test-api.nutech-integrasi.com/login";
  try {
    const response = await axios.post( url, {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.data;
    console.log("response", result);
    if (result?.message !== "Login Sukses") {
      return {
        success: false,
        error: {
          name: "Login error bro!",
        },
      };
    }

    const user = result;
    const token = result.data.token;
    console.log("token", token);
    (await cookies()).set("user", JSON.stringify(user));
    (await cookies()).set("token-->", token, {
      expires: 30,
      path: "",
    });

    return result;
  } catch (error) {
    console.error("Login gagal bro!:", error);
  }
}

// LOGOUT
export async function logout() {
  (await cookies()).delete("user");
}

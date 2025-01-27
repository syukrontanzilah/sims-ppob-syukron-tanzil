/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axios from "axios";
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
    // console.log("token", token);

    // (await cookies()).set("user", JSON.stringify(user));
    // (await cookies()).set("token-->", token, {
    //   expires: 30,
    //   path: "",
    // });

    const cookieInstance = cookies();
    (await cookieInstance).set("user", JSON.stringify(user), {
      maxAge: 24 * 60 * 60,
      path: "/",
    })
    ;(await cookieInstance).set("token", token, {
      maxAge: 24 * 60 * 60,
      path: "/"
    })

    return result;

  } catch (error) {
    console.error("Login gagal bro!:", error);
  }
}


// LOGOUT

// export async function logout() {
//   (await cookies()).delete("user");
// }


export async function logout() {
  const cookieInstance = await cookies();

  cookieInstance.delete("user");
  cookieInstance.delete("token");

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}


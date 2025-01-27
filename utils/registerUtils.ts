/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export interface IFormData {
  email: string;
  first_name: string; 
  last_name: string;
  password: string; 
}

export async function register(registrationData: IFormData) {
  const url = "https://take-home-test-api.nutech-integrasi.com/registration";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })

    const res = await response.json();
    return res

  } catch (error) {
    console.error("Register gagal nih!:", error);
  }
}
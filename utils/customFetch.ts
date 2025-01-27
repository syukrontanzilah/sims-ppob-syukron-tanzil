/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
interface FetcherParams {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, any>;
    token?: string;
    headers?: Record<string, any>;
    isBodyForm?: boolean;
  }
  
  export const customFetch = async ({
    url,
    body,
    token,
    headers: addHeaders,
    method = "GET",
    isBodyForm,
  }: FetcherParams): Promise<any> => {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      ...addHeaders,
    };

    if (!isBodyForm) {
        headers["Content-Type"] = "application/json";
      }
  
    try {
      const response = await fetch("https://take-home-test-api.nutech-integrasi.com" + url, {
        method,
        headers,
        body: body
        ? isBodyForm
          ? (body as FormData) 
          : JSON.stringify(body) 
        : undefined,
        cache: "no-cache",
      });
  
      const result = await response.json();
      if (!response.ok)
        return { error: true, stat_msg: result.stat_msg ?? result.message };
      return result;
    } catch (error: any) {
      console.error("❗ Unexpected fetch error:", error);
  
      return {
        error: true,
      };
    }
  };
  
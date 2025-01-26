/* eslint-disable @typescript-eslint/no-explicit-any */
interface FetcherParams {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, any>;
    token?: string;
    headers?: Record<string, any>;
  }
  
  export const fetcherPpob = async ({
    url,
    body,
    token,
    headers: addHeaders,
    method = "GET",
  }: FetcherParams): Promise<any> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...addHeaders,
    };
  
    try {
      const response = await fetch("https://take-home-test-api.nutech-integrasi.com" + url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
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
        // stat_msg: error.stat_msg ?? "Error!",
      };
    }
  };
  
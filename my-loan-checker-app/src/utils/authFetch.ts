import * as SecureStore from "expo-secure-store";


export const authFetch = async (url: string, options: any = {}, refreshToken: any) => {
  let access = await SecureStore.getItemAsync("accessToken");

  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${access}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    const newAccess = await refreshToken();

    if (!newAccess) {
      return response; 
    }

    options.headers.Authorization = `Bearer ${newAccess}`;
    response = await fetch(url, options);
  }

  return response;
};
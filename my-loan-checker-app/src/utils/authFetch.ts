import * as SecureStore from "expo-secure-store";


export const authFetch = async (url: string, options: any = {}, refreshToken: any) => {
  let access = await SecureStore.getItemAsync("accessToken");

  console.log(url);
  console.log(options);
  console.log(999999999999);
  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${access}`,
    "Content-Type": "application/json",
  };
  console.log(111111111111);
  let response = await fetch(url, options);
  console.log(222222222);
  if (response.status === 401) {
    const newAccess = await refreshToken();
    console.log(33333333333333);
    if (!newAccess) {
      console.log(444444444444444);
      return response; 
    }
    console.log(555555555555555555);
    options.headers.Authorization = `Bearer ${newAccess}`;
    response = await fetch(url, options);
    console.log(66666666666666666);
  }
  console.log(777777777777777777);
  console.log(response);
  return response;
};
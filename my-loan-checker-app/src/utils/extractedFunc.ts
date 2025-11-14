import { useRouter } from "expo-router";
import { authFetch } from "./authFetch";

const router = useRouter();
export function handleWindowChange(url: string){
      router.push(url);
}

export async function MutationFetch(url: string, options: any = {}, refreshToken: any){
      try {
            console.log(url);
            console.log(options);
            const response = await authFetch(url, options, refreshToken); // kod zatrzymuje się tutaj
            console.log(2);
            if (!response.ok){
                  console.log(response)
                  return [];
            } 
            const json = await response.json();
            console.log(1);
            console.log("Fetched:", json);
            return json || [];
      } catch (error) {
            console.log("authFetch error:", error);
            return [];
      }
}

export async function QueryFetch(url: string, options: any = {}, refreshToken: any){
      try {
            const response = await authFetch(url, options, refreshToken);
            if (!response.ok) return [];
            const json = await response.json();

            console.log("Fetched:", json);
            return json || [];
      } catch (error) {
            console.log("authFetch error:", error);
            return [];
      }
}
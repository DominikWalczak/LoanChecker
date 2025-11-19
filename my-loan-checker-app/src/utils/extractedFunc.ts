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
            const response = await authFetch(url, options, refreshToken);
            console.log(2);
            if (!response.ok){
                  const data = await response.json();
                  if (data){
                        console.log(data.error)
                        throw data
                  }
                  return [];
            } 
            const json = await response.json();
            console.log(1);
            console.log("Fetched:", json);
            return json || [];
      } catch (error) {
            console.log("MutationFetch error:", error);
            return error;
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
            console.log("QueryFetch error:", error);
            return [];
      }
}
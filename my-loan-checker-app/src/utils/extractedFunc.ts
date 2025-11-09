import { useRouter } from "expo-router";

const router = useRouter();
export function handleWindowChange(url: string){
      router.push(url);
}
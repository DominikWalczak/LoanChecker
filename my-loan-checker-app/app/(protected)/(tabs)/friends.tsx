import {View, Text, Pressable, StyleSheet} from "react-native";
import { handleWindowChange } from "@/src/utils/extractedFunc";
import DataList from "@/app/DataList";
import { useAuth } from "../../../src/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/src/utils/authFetch";
import env from '../../../src/env';


export default function Friends(){ 

  const { isLoggedIn, loading, accessToken, logout, refreshToken } = useAuth();
  async function dbFet() {
    try {
        const url = `${env.IP}/users`;
        console.log(url)
        const response = await authFetch(url, { method: "GET" }, refreshToken);
        console.log(2);
        console.log(response);
        if (!response.ok) return [];
        const json = await response.json();

        console.log("Fetched:", json);
        return json || [];
    } catch (error) {
        console.log("authFetch error:", error);
        return [];
    }
  }

  const {data, isError, isLoading, refetch} = useQuery({
    queryKey: ["users"],
    queryFn: () => dbFet(),
    enabled: true,
  });

  

  return(
    <View style={styles.main}>
      <View style={styles.pressView}>
        <Pressable style={styles.press} onPress={() => handleWindowChange("/friends_pending")}><Text style={styles.text2}>Pending $pending_amount</Text></Pressable>
        <Pressable style={styles.press} onPress={() => handleWindowChange("/friends_add")}><Text style={styles.text2}>Add Friends $friends_amount til 99, then 99+</Text></Pressable>
      </View>
      <DataList data={data}/>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#1F1F1F",
    flex: 1,
  },
  pressView:{
    marginTop: 20,
    alignItems: "center",
    rowGap: 20,
  },
  text: {
    color: "#EAEAEA",
    backgroundColor: "#2A2A2A",
    fontSize: 26,
    padding: 10,
    width: "50%",
    borderBottomRightRadius: 20,
    marginBottom: 30,
  },
  text2: {
    fontSize: 26, 
    color: "#EAEAEA",
  },
  press: {  
    backgroundColor: "#2A2A2A",
    padding: 10,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: '#2A2A2A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65, 
    elevation: 6,
  },
});
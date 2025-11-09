import { useQuery } from "@tanstack/react-query";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../src/context/AuthContext";
import env from '../../../src/env';
import { authFetch } from "../../../src/utils/authFetch";
import { handleWindowChange } from "@/src/utils/extractedFunc";

export default function Index() {
  const { isLoggedIn, loading, accessToken, logout, refreshToken } = useAuth();

  async function dbFetch() {
    try {
      const response = await authFetch(env.IP, {}, refreshToken);

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
    queryFn: () => dbFetch(),
    enabled: true,
  });
  return (
    <>
      <View style={styles.main}>
        <Text style={styles.text}>LoanChecker</Text>
        <View style={styles.pressView}>
          <Pressable style={styles.press} onPress={() => handleWindowChange("/my_loans")}><Text style={styles.text2}>My Loans</Text></Pressable>
          <Pressable style={styles.press} onPress={() => handleWindowChange("/issued_loans")}><Text style={styles.text2}>Issued loans</Text></Pressable>
          <Pressable style={styles.press} onPress={() => handleWindowChange("/friends")}><Text style={styles.text2}>Friends</Text></Pressable>
          <Pressable style={styles.press} onPress={() => logout()}><Text style={styles.text2}>Logout</Text></Pressable>
          {/* <Text style={styles.text2}>{JSON.stringify(data)}</Text> */}
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#1F1F1F",
    flex: 1,
    marginTop: 30,
  },
  pressView:{
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
    borderTopRightRadius: 20,
    marginBottom: 30,
    shadowColor: '#2A2A2A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65, 
    elevation: 6,

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
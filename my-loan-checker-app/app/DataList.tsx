import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import env from '../src/env';

export default function DataList({data, onAddFriend }: any){ 
  const [id, setId] = useState<string | null>(null);

  const { isLoggedIn, loading, accessToken, logout, refreshToken } = useAuth();

  useEffect(() => {
    async function loadId() {
      const storedId = await SecureStore.getItemAsync("ID");
      console.log("Loaded ID:", storedId);
      setId(storedId);
    }
    loadId();
  }, []);
  if(id === null){
    return;
  }
  return(
      <FlatList 
          contentContainerStyle={styles.pressView}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            if (item.id.toString() === id){
              return null;
            }
            return (              
              <View style={styles.press}>
                <Text style={styles.text2}>{item.name}, {item.vorname}, {item.id}</Text>
                <Pressable onPress={() => onAddFriend({ url: `${env.IP}/friends`, options: { method: "POST", body: JSON.stringify({ id: id, f_id: item.id }), }, refreshToken: refreshToken })}><Text style={styles.text2}>Add Friend</Text></Pressable>
              </View>)

          }}
      />
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
    flexDirection: "row",
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
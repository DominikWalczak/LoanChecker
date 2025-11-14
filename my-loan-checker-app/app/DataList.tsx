import { useAuth } from "@/src/context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import env from '../src/env';

interface DataListProps {
  type: number;
  data: any[];
  Mutation?: (params: { url: string; options: any; refreshToken: any }) => void;
  Mutation2?: (params: { url: string; options: any; refreshToken: any }) => void;
}

export default function DataList({ type, data, Mutation, Mutation2 }: DataListProps){ 
  const [id, setId] = useState<string | null>(null);

  const { isLoggedIn, loading, accessToken, logout, refreshToken } = useAuth();

  useEffect(() => {
    async function loadId() {
      const storedId = await SecureStore.getItemAsync("ID");
      console.log("Loaded ID:", storedId);
      console.log("Data:", JSON.stringify(data, null, 2));
      setId(storedId);
    }
    loadId();
  }, []);
  if(id === null){
    return;
  }
  if (type === 0 && Mutation){
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
                  <Pressable onPress={() => Mutation({ url: `${env.IP}/friends/pending`, options: { method: "POST", body: JSON.stringify({ id: id, f_id: item.id }), }, refreshToken: refreshToken })}><Text style={styles.text2}>Add Friend</Text></Pressable>
                </View>)
  
            }}
        />
    )
  }
  else if(type === 1 && Mutation && Mutation2){
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
                <Text style={styles.text2}>{item.name}, {item.vorname}, {item.id}, {item.friend_id}</Text>
                <Pressable onPress={() => 
                  Mutation({ url: `${env.IP}/friends/pending/accept`, options: { method: "POST", body: JSON.stringify({ id: id, f_id: item.friend_id, request_id: item.id }), }, refreshToken: refreshToken })}>
                    <Text style={styles.text2}> Accept </Text></Pressable>
                <Pressable onPress={() => 
                  Mutation2({ url: `${env.IP}/friends/pending/deny`, options: { method: "POST", body: JSON.stringify({request_id: item.id }), }, refreshToken: refreshToken })}>
                  <Text style={styles.text2}>Deny</Text></Pressable>
              </View>)

          }}
      />
    )
  }
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
    width: "60%",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: '#2A2A2A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65, 
    elevation: 6,
  },
});
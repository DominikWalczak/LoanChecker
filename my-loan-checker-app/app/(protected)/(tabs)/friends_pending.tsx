import DataList from "@/app/DataList";
import { MutationFetch, QueryFetch } from "@/src/utils/extractedFunc";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../src/context/AuthContext";
import env from '../../../src/env';

export default function Friends_Pending(){
  const [id, setId] = useState<string | null>(null);
  const { isLoggedIn, loading, accessToken, logout, refreshToken } = useAuth();

  const {data, isError, isLoading, refetch} = useQuery({
    queryKey: ["users"],
    queryFn: () => QueryFetch(`${env.IP}/friends/pending/request`, { method: "POST", body: JSON.stringify({ id: id }) }, refreshToken),
    enabled: false,
  });
  
  useEffect(() => {
    async function loadId() {
      const storedId = await SecureStore.getItemAsync("ID");
      console.log("Loaded ID:", storedId);
      setId(storedId);
    }
    loadId();
  }, []);

  useEffect(() => {
    console.log(1)
    refetch();
  }, [id]);



  const friendDenyMutation = useMutation({
    mutationFn: ({ url, options, refreshToken }: { url: string, options: any, refreshToken: any }) => 
      MutationFetch(url, options, refreshToken),
    onSuccess: (d) => {
        if(d?.error){
            throw d.error;
        }
      alert("Friend request denied");
      refetch();
    },
    onError: (error) => {
      alert(`Failed to deny friend request ${error}`);
    },
  });

    const friendAcceptMutation = useMutation({
    mutationFn: ({ url, options, refreshToken }: { url: string, options: any, refreshToken: any }) => 
      MutationFetch(url, options, refreshToken),
    onSuccess: (d) => {
        if(d?.error){
            throw d.error;
        }
      alert("Friend request accepted");
      refetch();
    },
    onError: (error) => {
      alert(`Failed to accept friend request ${error}`);
    },
  });

  return(
      <View style={styles.main}>
        <View style={styles.pressView}>
          {/* wczytywanie flatlisty oraz dodanie searchu */}
          <Text>{data.name}</Text>
        </View>
        <DataList type={1} data={data} Mutation={friendAcceptMutation.mutate} Mutation2={friendDenyMutation.mutate}/>
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
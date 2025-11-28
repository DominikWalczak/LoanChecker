import DataList from "@/app/DataList";
import { MutationFetch, QueryFetch } from "@/src/utils/extractedFunc";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAuth } from "../../../src/context/AuthContext";
import env from '../../../src/env';

export default function Friends_sent(){
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
    
    const {data, isError, isLoading, refetch} = useQuery({
        queryKey: ["requests", id],
        queryFn: () => QueryFetch(`${env.IP}/friends/pending/request/my`, { method: "POST", body: JSON.stringify({ id: id }) }, refreshToken),
        enabled: id !== null,   
    });

    const requestDeleteMutation = useMutation({
        mutationFn: ({ url, options, refreshToken }: { url: string, options: any, refreshToken: any }) => 
            MutationFetch(url, options, refreshToken),
        onSuccess: (d) => {
        if(d?.error){
            throw d.error;
        }
        alert("Friend request deleted");
        refetch();
        },
        onError: (error) => {
        alert(`Failed to delete friend request ${error}`);
        },
    });
    return(
      <View style={styles.main}>
        <View style={styles.pressView}>
        </View>
        <DataList type={3} data={data} Mutation={requestDeleteMutation.mutate}/>
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
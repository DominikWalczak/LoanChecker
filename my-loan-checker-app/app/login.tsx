import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type log = {
    email: string;
    password: string;
}
export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    
    async function loginUser(data: log) {
        try {
            console.log(data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    async function Log() {
        const loginData: log = {
            email,
            password,
        }

        await loginUser(loginData);
    }
    return(
        <View style={styles.main}>
            <View style={styles.pressView}>
                <TextInput 
                    placeholder="E-mail"
                    placeholderTextColor="#EAEAEA"
                    style={styles.text}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    placeholder="Password"
                    placeholderTextColor="#EAEAEA"
                    style={styles.text}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View style={styles.pressView}>
                <Pressable style={styles.press} onPress={() => console.log(2)}><Text style={styles.text2}>Log in</Text></Pressable>
            </View>
            <View style={styles.pressView}>
                <Pressable style={styles.press} onPress={() => router.push("/register")}><Text style={styles.text2}>Got no account yet?</Text></Pressable>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#1F1F1F",
    flex: 1,
  },
  pressView:{
    alignItems: "center",
    rowGap: 14,
    marginTop: 20,
  },
  text: {
    color: "#EAEAEA",
    backgroundColor: "#2A2A2A",
    fontSize: 26,
    padding: 10,
    width: "70%",
    borderRadius: 20,
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
  },
});
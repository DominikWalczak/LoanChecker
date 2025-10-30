import { useMutation } from '@tanstack/react-query';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from 'zod';
import env from '../src/env';

const LoginSchema = z.object({
  email: z.string().email({ message: "Provided email is wrong" }),
  password: z.string().min(1, { message: "Password is required" })
});

type LoginData = z.infer<typeof LoginSchema>;

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function loginUser(data: LoginData) {
        console.log(data);
        try {
            const response = await fetch(`${env.IP}/users/${encodeURIComponent(data.email)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            });

            if (!response.ok) {
                return response.json().catch(() => ({}));
            }

            const json = await response.json();
            console.log('Server response:', json);

            return json;
        } catch (error) {
            console.error('Error sending data:', error);
            throw error;
        }
    }

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log(data);
            if(data.message){
                throw Error(data.message);
            }
        },
        onError: (error) => {
            alert(`Login failed: ${error}`);
        },
    });

    const handleLogin = () => {
        try {
            const dataToValidate = { email, password };
            
            const validatedData = LoginSchema.parse(dataToValidate);

            loginMutation.mutate(validatedData);

        } catch (error) {
            console.log(`handleLogin Error: ${error}`);
        }
    };
    return(
        <View style={styles.main}>
            <View style={styles.pressView}>
                <TextInput 
                    placeholder="E-mail"
                    placeholderTextColor="#EAEAEA"
                    style={styles.text}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                <Pressable style={styles.press} onPress={handleLogin}><Text style={styles.text2}>Log in</Text></Pressable>
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
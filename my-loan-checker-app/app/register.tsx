import { useMutation } from '@tanstack/react-query';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from 'zod';
import env from '../src/env';

const registrationSchema = z.object({
    email: z.string().email("Written data must be an email").min(5, "Email must be longer than this"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    name: z.string().min(1, "Name cannot be empty"),
    vorname: z.string().min(1, "Vorname cannot be empty"),
    pesel: z.string().min(11, "PESEL must have 11 digits").max(11, "PESEL must have 11 digits"),
});

type RegistrationData = z.infer<typeof registrationSchema>;

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [vorname, setVorname] = useState('');
    const [pesel, setPesel] = useState('');
    const router = useRouter();

    async function registerUser(data: RegistrationData) {
        let errorMessages;
        try {
            const dataValidation = registrationSchema.safeParse(data);
            if (!dataValidation.success){
                errorMessages = Object.values(dataValidation.error.flatten().fieldErrors)
                    .map(errors => errors.join('; '))
                    .join('\n');
                throw new Error(errorMessages);
            }
            const response = await fetch(`${env.IP}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log('Server response:', result);

        } catch (error) {
            console.log('Error sending data:', error);
            return {number: 1,  error: errorMessages };
        }
    }

    const registrateMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (data?.error){
                throw new Error(data?.error)
            }

            router.replace("/login");
        },
        onError: (error) => {
            alert(`Registration failed: ${error}`)
        },
    });

    async function handleSubmit() {
        try {
            const userData: RegistrationData = {
                email,
                password,
                name,
                vorname,
                pesel,
            };
            registrateMutation.mutate(userData);
        } catch (error) {
            console.log(`handleSubmit Error: ${error}`);
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
                <TextInput 
                    placeholder="Name"
                    placeholderTextColor="#EAEAEA"
                    style={styles.text}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput 
                    placeholder="Vorname"
                    placeholderTextColor="#EAEAEA"
                    style={styles.text}
                    value={vorname}
                    onChangeText={setVorname}
                />
                <TextInput 
                    placeholder="Pesel"
                    placeholderTextColor="#EAEAEA"
                    style={styles.text}
                    value={pesel}
                    onChangeText={setPesel}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.pressView}>
                <Pressable style={styles.press} onPress={handleSubmit}><Text style={styles.text2}>Create an account</Text></Pressable>
            </View>
            <View style={styles.pressView}>
                <Pressable style={styles.press} onPress={() => router.push("/login")}><Text style={styles.text2}>Got an account?</Text></Pressable>
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
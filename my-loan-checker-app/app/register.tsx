import { useRouter } from "expo-router";
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type RegistrationData = {
    email: string;
    password: string;
    name: string;
    vorname: string;
    pesel: string;

}
export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [vorname, setVorname] = useState('');
    const [pesel, setPesel] = useState('');
    const router = useRouter();

    async function registerUser(data: RegistrationData) {
        try {
            console.log(2);
            const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            console.log(3);

            const result = await response.json();
            console.log('Server response:', result);
            console.log(4);
            router.replace("/login"); // konieczne dodanie walidacji czy dane są oraz czy pesel, email jest poprawny oraz ilość znaków
        } catch (error) {
            console.log(5);
            console.error('Error sending data:', error);
        }
    }

    async function handleSubmit() {
        console.log(1);
        const userData: RegistrationData = {
            email,
            password,
            name,
            vorname,
            pesel,
        };
        await registerUser(userData);

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
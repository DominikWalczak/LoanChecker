import { Text, View, StyleSheet, Pressable} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  function handleChangeWindow(windowName: "/my_loans" | "/issued_loans" | "/friends"){
    router.push(windowName);
  }

  return (
    <>
      <View style={styles.main}>
        <Text style={styles.text}>LoanChecker</Text>
        <View style={styles.pressView}>
          <Pressable style={styles.press} onPress={() => handleChangeWindow("/my_loans")}><Text style={styles.text2}>My Loans</Text></Pressable>
          <Pressable style={styles.press} onPress={() => handleChangeWindow("/issued_loans")}><Text style={styles.text2}>Issued loans</Text></Pressable>
          <Pressable style={styles.press} onPress={() => handleChangeWindow("/friends")}><Text style={styles.text2}>Friends</Text></Pressable>
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
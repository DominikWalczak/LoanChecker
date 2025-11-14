import { handleWindowChange } from "@/src/utils/extractedFunc";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Friends(){   

  return(
    <View style={styles.main}>
      <View style={styles.pressView}>
        <Pressable style={styles.press} onPress={() => handleWindowChange("/friends_pending")}><Text style={styles.text2}>Pending $pending_amount</Text></Pressable>
        <Pressable style={styles.press} onPress={() => handleWindowChange("/friends_add")}><Text style={styles.text2}>Sent Requests</Text></Pressable>
        <Pressable style={styles.press} onPress={() => handleWindowChange("/friends_add")}><Text style={styles.text2}>Add Friends $friends_amount til 99, then 99+</Text></Pressable>
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
import {View, Text, Pressable, StyleSheet} from "react-native";

export default function Issued_Loans(){
    return(
        <View style={styles.main}>
          <View style={styles.pressView}>
            <Text style={styles.text2}>Loans $loans-count</Text>
            <Text style={styles.press}></Text>
            {/* wczytywanie flatlisty oraz dodanie searchu */}
            <View style={styles.press}>
              <View>
                <Text style={styles.text2}>Who took the loan</Text>
                <Text style={styles.text2}>Loan date</Text>
              </View>
              <View>
                <Text style={styles.text2}>Total payment amount</Text>
                <Text style={styles.text2}>Payment amount</Text>
              </View>
              <View>
                <Text style={styles.text2}>Total amount</Text>
                <Text style={styles.text2}>Paid off amount</Text>
              </View>
              <View>
                <Text style={styles.text2}>Description</Text>
              </View>
              {/* Można dodać również co cykliczność opłat oraz termin spłacenia pożyczki */}
            </View>
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
  },
});
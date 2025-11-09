import {View, Text, Pressable, StyleSheet, FlatList} from "react-native";


export default function DataList({data}: any){ 
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(data)
    console.log(1)
    console.log(1)
    console.log(data[6].id)
    console.log(1)
    console.log(1)
    console.log(1)
    return(
        <FlatList 
            contentContainerStyle={styles.pressView}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.press}>
                    <Text style={styles.text2}>{item.name}, {item.vorname}, {item.id}</Text>
                </View>
            )}
        />
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
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function HomeScreen({ navigation }) {
  function debugStuff() {
    console.log("hi")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <Pressable onPress={() => navigation.navigate('Profile Stack', { screen: 'Record Weight' })}>
        <Text style={styles.testText}>Go to 'Record Today's Weight' screen</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Workout Stack', { screen: 'Record Workout' })}>
        <Text style={styles.testText}>Go to 'Record Today's Workout' screen</Text>
      </Pressable>
      <Pressable onPress={debugStuff}>
        <Text style={styles.debug}>Scuffed Debug Button</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#225588",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    // color: "#F4F5F5"
  },
  debug: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 48,
    marginBottom: 16,
    // color: "#F4F5F5"
  }
})
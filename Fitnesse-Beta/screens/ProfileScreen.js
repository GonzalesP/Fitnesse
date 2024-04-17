import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Pressable onPress={() => navigation.navigate("Weight Goal")}>
        <Text style={styles.testText}>Go to 'Weight Goal' screen</Text>
      </Pressable>
    </View>
  );
};

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
  }
})
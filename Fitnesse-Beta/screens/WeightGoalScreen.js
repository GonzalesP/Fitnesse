import { View, Text, StyleSheet } from "react-native";

export default function WeightGoalScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calculate Weight Goal</Text>
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
  },
  testText: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#E17000",
    padding: 16,
  },
})
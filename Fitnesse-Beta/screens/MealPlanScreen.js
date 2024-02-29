import { View, Text, StyleSheet, Pressable } from "react-native";

export default function MealPlanScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Edit Meal Plan")}>
        <Text style={styles.testText}>Go to 'Edit Meal Plan' screen</Text>
      </Pressable>
      <Text style={styles.text}>Meal Plan</Text>
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
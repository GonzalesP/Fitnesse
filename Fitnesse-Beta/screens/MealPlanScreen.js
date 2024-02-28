import { View, Text, StyleSheet } from "react-native";

const MealPlanScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Meal Plan</Text>
    </View>
  );
}

export default MealPlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  }
})
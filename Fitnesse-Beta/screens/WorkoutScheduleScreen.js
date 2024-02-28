import { View, Text, StyleSheet } from "react-native";

const WorkoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Workouts</Text>
    </View>
  );
}

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#225588",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#F4F5F5"
  }
})
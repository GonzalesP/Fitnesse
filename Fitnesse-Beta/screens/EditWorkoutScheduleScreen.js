import { View, Text, StyleSheet } from "react-native";

const WorkoutScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Workout Schedule</Text>
    </View>
  );
}

export default WorkoutScheduleScreen;

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
    // color: "#F4F5F5",
    padding: 16,
  },
})
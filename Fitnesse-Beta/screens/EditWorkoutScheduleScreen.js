import { View, Text, StyleSheet } from "react-native";

export default function EditWorkoutScheduleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Workout Schedule</Text>
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
    // color: "#F4F5F5",
    padding: 16,
  },
})
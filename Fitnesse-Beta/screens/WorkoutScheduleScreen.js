import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState } from "react";
import workoutSchedule from '../data/default-workout-schedule.json';

export default function WorkoutScheduleScreen({ navigation }) {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Edit Workout Schedule")}>
        <Text style={styles.testText}>Go to 'Edit Workout Schedule' screen</Text>
      </Pressable>

      <View style={styles.daysContainer}>
        <View>
          <Pressable onPress={setCurrentDay.bind(this, 0)}>
            <Text style={styles.text}>S</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={setCurrentDay.bind(this, 1)}>
            <Text style={styles.text}>M</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={setCurrentDay.bind(this, 2)}>
            <Text style={styles.text}>T</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={setCurrentDay.bind(this, 3)}>
            <Text style={styles.text}>W</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={setCurrentDay.bind(this, 4)}>
            <Text style={styles.text}>T</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={setCurrentDay.bind(this, 5)}>
            <Text style={styles.text}>F</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={setCurrentDay.bind(this, 6)}>
            <Text style={styles.text}>S</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.text}>{currentDay}</Text>
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
    // color: "#F4F5F5",
    padding: 16,
  },
  testText: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#E17000",
    padding: 16,
  },
  daysContainer: {
    flexDirection: "row",
    padding: 16,
  }
})
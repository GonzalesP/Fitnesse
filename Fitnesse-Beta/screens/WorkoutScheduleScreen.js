import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutScheduleScreen({ navigation }) {
  const currentDay = new Date().getDay();
  const [day, setDay] = useState(currentDay);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [dayName, setDayName] = useState(dayNames[currentDay]);

  const [workoutSchedule, setWorkoutSchedule] = useState();
  const [loading, setLoading] = useState(true);

  function updateDay(index) {
    setDay(index)
    setDayName(dayNames[index]);
  }

  function renderWorkout({ item }) {
    let exerciseDesc;
    if (item.sets != null) {
      exerciseDesc = <Text>{item.sets}x{item.reps}</Text>
    }
    else if (item.duration != null) {
      exerciseDesc = <Text>{item.duration}</Text>
    }
    else {
      exerciseDesc = <Text></Text>
    }

    return (
      <View key={item.id}>
        <Text>{item.exerciseName}</Text>
        {exerciseDesc}
      </View>
    )
  }

  async function getWorkoutSchedule() {
    // get workout schedule from Storage
    let debugMode = await AsyncStorage.getItem('debugMode');
    if (debugMode == "on") {
      let ws = JSON.parse(await AsyncStorage.getItem('debugWorkoutSchedule'));
      setWorkoutSchedule(ws);
    }
    else {
      // getItem userWorkoutSchedule
    }

    setLoading(false);
  }

  

  if (loading) {
    getWorkoutSchedule();
    return (
      <View>
        <Text>loading...</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.bodyContainer}>
        {/* Select Day of the Week */}
        <View style={styles.daysContainer}>
          <Pressable onPress={updateDay.bind(this, 0)}>
            <Text>S</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 1)}>
            <Text>M</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 2)}>
            <Text>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 3)}>
            <Text>W</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 4)}>
            <Text>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 5)}>
            <Text>F</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 6)}>
            <Text>S</Text>
          </Pressable>
        </View>
        {/* workout header (day of week + workout type) */}
        <View>
          <Text>{dayName}</Text>
          <Text>{workoutSchedule[day].type}</Text>
        </View>
        {/* display workout */}
        <FlatList
          data={workoutSchedule[day].exercises}
          renderItem={renderWorkout}
        />
      </View>
    );
  }
}

// #225588
// #F4F5F5
// #E17000
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  }
})
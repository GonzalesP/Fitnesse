import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";


import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutScheduleScreen({ navigation }) {
  const currentDay = new Date().getDay();
  const [day, setDay] = useState(currentDay);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [dayName, setDayName] = useState(dayNames[currentDay]);

  const [workoutSchedule, setWorkoutSchedule] = useState();
  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getWorkoutSchedule() {
    // fetch data from AsyncStorage
    let ws;
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      ws = JSON.parse(await AsyncStorage.getItem('demoWorkoutSchedule'));
      setWorkoutSchedule(ws);
    }
    else {
      ws = JSON.parse(await AsyncStorage.getItem('userWorkoutSchedule'));
      setWorkoutSchedule(ws);
    }
    // remove loading screen
    setLoading(false);
  }

  function updateDay(index) {
    setDay(index)
    setDayName(dayNames[index]);
  }

  function renderWorkout({ item }) {
    let exerciseDesc;
    if (item.sets != null) {
      exerciseDesc = <Text style={styles.exerciseDescText}>{item.sets}x{item.reps}</Text>
    }
    else if (item.duration != null) {
      exerciseDesc = <Text style={styles.exerciseDescText}>{item.duration}</Text>
    }
    else {
      exerciseDesc = <Text style={styles.exerciseDescText}></Text>
    }

    return (
      <View key={item.id} style={styles.exerciseContainer}>
        <Text style={styles.exerciseNameText}>{item.exerciseName}</Text>
        {exerciseDesc}
      </View>
    )
  }
  


  if (loading) {
    getWorkoutSchedule();
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        {/* Select Day of the Week */}
        <View style={styles.daysContainer}>
          <Pressable onPress={updateDay.bind(this, 0)}>
            <Text style={styles.dayButton}>S</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 1)}>
            <Text style={styles.dayButton}>M</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 2)}>
            <Text style={styles.dayButton}>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 3)}>
            <Text style={styles.dayButton}>W</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 4)}>
            <Text style={styles.dayButton}>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 5)}>
            <Text style={styles.dayButton}>F</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 6)}>
            <Text style={styles.dayButton}>S</Text>
          </Pressable>
        </View>
        {/* workout header (day of week + workout type) */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{dayName}</Text>
          <Text style={styles.headerText}>{workoutSchedule[day].type}</Text>
        </View>
        {/* display workout */}
        <FlatList
          data={workoutSchedule[day].exercises}
          renderItem={renderWorkout}
          ItemSeparatorComponent={<View style={{ height: 16 }}></View>}
          ListHeaderComponent={<View style={{ height: 16 }}></View>}
          ListFooterComponent={<View style={{ height: 16 }}></View>}
        />
      </View>
    );
  }
}

// #225588
// #F4F5F5
// #E17000
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 0
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24
  },
  dayButton: {
    fontSize: 24
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  exerciseContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderWidth: 2,
    borderRadius: 16
  },
  exerciseNameText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  exerciseDescText: {
    fontSize: 18,
  }
})
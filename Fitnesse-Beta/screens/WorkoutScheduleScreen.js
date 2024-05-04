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

  function recordWorkoutButton() {
    let button;
    if (day == currentDay) {
      button = (
        <Pressable onPress={() => navigation.navigate("Record Workout")}>
          <Text style={styles.buttonText}>Record Workout</Text>
        </Pressable>
      );
    }
    else {
      button = (
        <></>
      );
    }
    return (
      <View style={styles.buttonContainer}>
        {button}
        <View style={{ height: 16 }}></View>
      </View>
    )
  }
  


  if (loading) {
    getWorkoutSchedule();
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#002B54" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        {/* Select Day of the Week */}
        <View style={styles.daysContainer}>
          <Pressable onPress={updateDay.bind(this, 0)}>
            <Text style={
              day == 0 ? styles.activeDayButton : styles.inactiveDayButton
              }>S</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 1)}>
            <Text style={
              day == 1 ? styles.activeDayButton : styles.inactiveDayButton
              }>M</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 2)}>
            <Text style={
              day == 2 ? styles.activeDayButton : styles.inactiveDayButton
              }>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 3)}>
            <Text style={
              day == 3 ? styles.activeDayButton : styles.inactiveDayButton
              }>W</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 4)}>
            <Text style={
              day == 4 ? styles.activeDayButton : styles.inactiveDayButton
              }>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 5)}>
            <Text style={
              day == 5 ? styles.activeDayButton : styles.inactiveDayButton
              }>F</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 6)}>
            <Text style={
              day == 6 ? styles.activeDayButton : styles.inactiveDayButton
              }>S</Text>
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
          ListFooterComponent={recordWorkoutButton}
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
    alignItems: "center",
    backgroundColor: "#C3DCF6"
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#C3DCF6"
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24
  },
  activeDayButton: {
    fontSize: 24,
    height: 36,
    width: 36,
    backgroundColor: "#F58220",
    borderWidth: 2,
    borderRadius: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 4
  },
  inactiveDayButton: {
    fontSize: 24,
    height: 36,
    width: 36,
    borderWidth: 2,
    borderRadius: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: "#9DBED8",
    padding: 4
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
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    marginVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#F58220",
    alignSelf: "flex-start"
  }
})
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState } from "react";
import workoutSchedule from '../data/default-workout-schedule.json';

export default function WorkoutScheduleScreen({ navigation }) {
  const currentDay = new Date().getDay();
  const [day, setDay] = useState(currentDay);
  const [workout, setWorkout] = useState(workoutSchedule[day]);
  
  function updateWorkoutView(newDay) {
    setDay(newDay);
    setWorkout(workoutSchedule[newDay]);
  };

  function renderWorkout({ item }) {
    let exerciseDesc;
    if (item.sets != null) {
      exerciseDesc = <Text style={styles.workoutText}>{item.sets}x{item.reps}</Text>
    }
    else if (item.duration != null) {
      exerciseDesc = <Text style={styles.workoutText}>{item.duration}</Text>
    }
    else {
      exerciseDesc = <Text style={styles.workoutText}></Text>
    }
    return (
      <View key={item.id}>
        <Text style={styles.workoutText}>{item.exerciseName}</Text>
        {exerciseDesc}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Edit Workout Schedule")}>
        <Text style={styles.testText}>Go to 'Edit Workout Schedule' screen</Text>
      </Pressable>

      <View style={styles.daysContainer}>
        <Pressable onPress={updateWorkoutView.bind(this, 0)}>
          <Text style={styles.text}>S</Text>
        </Pressable>
      
        <Pressable onPress={updateWorkoutView.bind(this, 1)}>
          <Text style={styles.text}>M</Text>
        </Pressable>
      
        <Pressable onPress={updateWorkoutView.bind(this, 2)}>
          <Text style={styles.text}>T</Text>
        </Pressable>
      
        <Pressable onPress={updateWorkoutView.bind(this, 3)}>
          <Text style={styles.text}>W</Text>
        </Pressable>
      
        <Pressable onPress={updateWorkoutView.bind(this, 4)}>
          <Text style={styles.text}>T</Text>
        </Pressable>
      
        <Pressable onPress={updateWorkoutView.bind(this, 5)}>
          <Text style={styles.text}>F</Text>
        </Pressable>
      
        <Pressable onPress={updateWorkoutView.bind(this, 6)}>
          <Text style={styles.text}>S</Text>
        </Pressable>
      </View>

      <View style={styles.workoutContainer}>
        <View style={styles.workoutHeader}>
          <Text style={styles.text}>{workout.day}</Text>
          <Text style={styles.text}>{workout.type}</Text>
        </View>

        <FlatList
          data={workout.workouts}
          renderItem={renderWorkout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // backgroundColor: "#225588",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    // color: "#F4F5F5",
  },
  testText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    // color: "#E17000",
    padding: 16,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  workoutContainer: {
    flex: 1,
    padding: 16,
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  workoutText: {
    fontSize: 16,
  },
})
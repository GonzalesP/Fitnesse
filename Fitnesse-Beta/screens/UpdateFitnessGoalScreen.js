import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";

import { wsBalanced, wsImproveCardio, wsIncreaseStrength, wsWeightLoss } from "../data/workoutScheduleDataSets";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdateFitnessGoalScreen({ navigation }) {
  const [currentGoal, setCurrentGoal] = useState();
  const [goalChoice, setGoalChoice] = useState();

  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getGoal() {
    // fetch data from AsyncStorage
    let fg;
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      fg = await AsyncStorage.getItem('demoFitnessGoal');
      setCurrentGoal(fg);
    }
    else {
      fg = await AsyncStorage.getItem('userFitnessGoal');
      setCurrentGoal(fg);
    }
    // remove loading screen
    setLoading(false);
  }

  async function saveUserInput() {
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      if (goalChoice == "balanced") {
        await AsyncStorage.setItem('demoFitnessGoal', 'balanced')
        await AsyncStorage.setItem('demoWorkoutSchedule', JSON.stringify(wsBalanced))
      }
      else if (goalChoice == "improve cardio") {
        await AsyncStorage.setItem('demoFitnessGoal', 'improve cardio')
        await AsyncStorage.setItem('demoWorkoutSchedule', JSON.stringify(wsImproveCardio))
      }
      else if (goalChoice == "increase strength") {
        await AsyncStorage.setItem('demoFitnessGoal', 'increase strength')
        await AsyncStorage.setItem('demoWorkoutSchedule', JSON.stringify(wsIncreaseStrength))
      }
      else if (goalChoice == "weight loss") {
        await AsyncStorage.setItem('demoFitnessGoal', 'weight loss')
        await AsyncStorage.setItem('demoWorkoutSchedule', JSON.stringify(wsWeightLoss))
      }
    }
    else {
      if (goalChoice == "balanced") {
        await AsyncStorage.setItem('userFitnessGoal', 'balanced')
        await AsyncStorage.setItem('userWorkoutSchedule', JSON.stringify(wsBalanced))
      }
      else if (goalChoice == "improve cardio") {
        await AsyncStorage.setItem('userFitnessGoal', 'improve cardio')
        await AsyncStorage.setItem('userWorkoutSchedule', JSON.stringify(wsImproveCardio))
      }
      else if (goalChoice == "increase strength") {
        await AsyncStorage.setItem('userFitnessGoal', 'increase strength')
        await AsyncStorage.setItem('userWorkoutSchedule', JSON.stringify(wsIncreaseStrength))
      }
      else if (goalChoice == "weight loss") {
        await AsyncStorage.setItem('userFitnessGoal', 'weight loss')
        await AsyncStorage.setItem('userWorkoutSchedule', JSON.stringify(wsWeightLoss))
      }
    }

    navigation.navigate("Profile")
  }



  if (loading) {
    getGoal();
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        {/* display current goal */}
        <View style={styles.traitContainer}>
          <Text style={styles.traitText}>Current Goal: </Text>
          <Text style={styles.valueText}>{currentGoal}</Text>
        </View>

        {/* button options */}
        <View style={styles.optionContainer}>
          <Pressable onPress={setGoalChoice.bind(this, 'balanced')}>
            <Text style={styles.optionText}>Balanced</Text>
          </Pressable>
          <Pressable onPress={setGoalChoice.bind(this, 'improve cardio')}>
            <Text style={styles.optionText}>Improve Cardio</Text>
          </Pressable>
          <Pressable onPress={setGoalChoice.bind(this, 'increase strength')}>
            <Text style={styles.optionText}>Increase Strength</Text>
          </Pressable>
          <Pressable onPress={setGoalChoice.bind(this, 'weight loss')}>
            <Text style={styles.optionText}>Weight Loss</Text>
          </Pressable>
        </View>

        {/* display selected goal */}
        {
          goalChoice &&
          <View>
            <View style={{ height: 16 }}></View>
            <View style={styles.traitContainer}>
              <Text style={styles.traitText}>Selected Goal: </Text>
              <Text style={styles.valueText}>{goalChoice}</Text>
            </View>
            <Pressable onPress={saveUserInput}>
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
          </View>
        }
      </View>
    );
  }
};

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
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    margin: 4,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#719dcd",
    alignSelf: "flex-start"
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 16
  },
  traitContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  traitText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  valueText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    marginTop: 12,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#F58220",
    alignSelf: "flex-start"
  }
})
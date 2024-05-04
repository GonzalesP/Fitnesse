import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";

import { initializeData } from "../data/initializeData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [showCardOne, setShowCardOne] = useState(false);
  const [showCardTwo, setShowCardTwo] = useState(false);
  const [showCardThree, setShowCardThree] = useState(false);

  const [demoMode, setDemoMode] = useState();
  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getTodoList() {
    await initializeData();  // initialize data when app first starts

    let today = new Date().toDateString();
    // fetch data from AsyncStorage
    let height;
    let weightHistory;
    let lastWorkoutDate;

    let dm = await AsyncStorage.getItem('demoMode');
    setDemoMode(dm);
    if (demoMode == "on") {
      height = JSON.parse(await AsyncStorage.getItem('demoHeight'));
      weightHistory = JSON.parse(await AsyncStorage.getItem('demoWeightHistory'));
      lastWorkoutDate = await AsyncStorage.getItem('demoLastWorkoutDate');
    }
    else {
      height = JSON.parse(await AsyncStorage.getItem('userHeight'));
      weightHistory = JSON.parse(await AsyncStorage.getItem('userWeightHistory'));
      lastWorkoutDate = await AsyncStorage.getItem('userLastWorkoutDate');
    }

    // decide whether to render card one or two (weight & height vs. weight only)
    if (height == null || weightHistory == null) {
      // card one
      setShowCardOne(true);
      setShowCardTwo(false);
    }
    else {
      // hide card one
      setShowCardOne(false);
      // determine whether to show card two
      if (weightHistory[weightHistory.length - 1]["date"] != today) {
        setShowCardTwo(true);
      }
      else {
        setShowCardTwo(false);
      }
    }
    // determine whether to show card three
    if (lastWorkoutDate != today) {
      setShowCardThree(true);
    }
    else {
      setShowCardThree(false);
    }

    // remove loading screen
    setLoading(false);
  }

  async function resetData() {
    await AsyncStorage.clear();
    setLoading(true);
  }

  async function toggleDemoData() {
    if (demoMode == "off") {
      await AsyncStorage.setItem('demoMode', 'on');
    }
    else {
      await AsyncStorage.setItem('demoMode', 'off');
    }
    setLoading(true);
  }



  if (loading) {
    getTodoList();
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#002B54" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.todoListContainer}>
          <Text style={styles.headerText}>To-Do:</Text>

          { showCardOne &&
          <Pressable onPress={() => navigation.navigate(
            'Profile Stack', { screen: 'Update Height Weight', initial: false }
          )}>
            <View style={styles.todoCardContainer}>
              <Text style={styles.todoCardText}>Record Height and Weight</Text>
            </View>
          </Pressable> }

          { showCardTwo &&
            <Pressable onPress={() => navigation.navigate(
              'Profile Stack', { screen: 'Record Weight', initial: false }
            )}>
              <View style={styles.todoCardContainer}>
                <Text style={styles.todoCardText}>Record Today's Weight</Text>
              </View>
            </Pressable> }

          { showCardThree &&
          <Pressable onPress={() => navigation.navigate(
            'Workout Stack', { screen: 'Record Workout', initial: false }
          )}>
            <View style={styles.todoCardContainer}>
              <Text style={styles.todoCardText}>Record Today's Workout</Text>
            </View>
          </Pressable> }

          { !showCardOne && !showCardTwo && !showCardThree &&
            <Text style={styles.todoCardText}>Nothing else to do!</Text>
          }
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={toggleDemoData}>
            <Text style={demoMode == "off" ? styles.offButtonText : styles.onButtonText}>{
              demoMode == "off" ? "Use Demo Data: off" : "Use Demo Data: on"
            }</Text>
          </Pressable>

          <Pressable onPress={resetData}>
            <Text style={styles.resetButtonText}>Reset Data</Text>
          </Pressable>
        </View>
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
    backgroundColor: "#C3DCF6"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16
  },
  todoListContainer: {
    flex: 1,
  },
  todoCardContainer: {
    backgroundColor: "#FFF",
    padding: 8,
    borderWidth: 2,
    borderRadius: 16,
    marginBottom: 8
  },
  todoCardText: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: "row-reverse"
  },
  offButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#ce7371",
    alignSelf: "flex-start"
  },
  onButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#9dce71",
    alignSelf: "flex-start"
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#F58220",
    alignSelf: "flex-start"
  }
})
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { initializeDemoVariables, printDemoVariables } from "../data/demoFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [showCardOne, setShowCardOne] = useState(false);
  const [showCardTwo, setShowCardTwo] = useState(false);

  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getTodoList() {
    let today = new Date().toDateString();
    // fetch data from AsyncStorage
    let height;
    let weightHistory;
    let lastWorkoutDate;

    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      height = await AsyncStorage.getItem('demoHeight');
      weightHistory = await AsyncStorage.getItem('demoWeightHistory');
      lastWorkoutDate = await AsyncStorage.getItem('demoLastWorkoutDate');
    }
    else {
      // user defaults
    }

    // decide whether to render card one or two and three (two options)
    if (height == null || weightHistory == null) {
      // card one
      setShowCardOne(true);
    }
    else {
      if (weightHistory[weightHistory.length - 1]["date"] != today) {
        // card two
        setShowCardTwo(true);
      }
    }

    // remove loading screen
    setLoading(false);
  }

  async function debugStuff() {
    await initializeDemoVariables();
    await printDemoVariables();
  }

  if (loading) {
    getTodoList();
    return (
      <View>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.headerText}>To-Do:</Text>

        { showCardOne &&
        <Pressable onPress={() => navigation.navigate(
          'Profile Stack', { screen: 'Update Height Weight', initial: false }
        )}>
          <View style={styles.todoCardContainer}>
            <Text style={styles.text}>Record Height and Weight</Text>
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
  
        <Pressable onPress={debugStuff}>
          <Text style={styles.debugButton}>Scuffed Debug Button</Text>
        </Pressable>
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
    padding: 16,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
  },
  todoCardContainer: {
    backgroundColor: "#FFF",
    padding: 8,
    borderWidth: 2,
    borderRadius: 16,
  },
  todoCardText: {
    fontSize: 24,
  },
  debugButton: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 48,
  }
})
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

import { initializeDebugVariables } from "../data/debugFunctions";

export default function HomeScreen({ navigation }) {
  // loading: initialize user data
  // done loading: show Home screen
  const [loading, setLoading] = useState(true);
  // const [showBMITodoCard]

  async function debugStuff() {
    await initializeDebugVariables();
    console.log("debug variables initialized");
  }

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.text}>To-Do:</Text>
      <Pressable onPress={() => navigation.navigate(
        'Profile Stack', { screen: 'Update Weight and Height', initial: false }
      )}>
        <Text style={styles.text}>Record Height and Weight</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate(
        'Profile Stack', { screen: 'Record Weight', initial: false }
      )}>
        <Text style={styles.text}>Record Today's Weight</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate(
        'Workout Stack', { screen: 'Record Workout', initial: false }
      )}>
        <Text style={styles.text}>Start Today's Workout</Text>
      </Pressable>

      <Pressable onPress={debugStuff}>
        <Text style={styles.debugButton}>Scuffed Debug Button</Text>
      </Pressable>
    </View>
  );
}

// #225588
// #F4F5F5
// #E17000
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  debugButton: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 48,
  }
})
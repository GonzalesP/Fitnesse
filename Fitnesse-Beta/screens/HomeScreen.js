import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

import { initializeDebugVariables } from "../data/debugFunctions";

export default function HomeScreen({ navigation }) {
  // first function: check if debug variables and user data is null from Async
  // if so, initialize everything
  async function debugStuff() {
    await initializeDebugVariables();
    console.log("debug variables initialized");
  }

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.text}>To-Do:</Text>
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
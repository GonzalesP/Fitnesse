import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

import { debugHeight, debugWeightHistory, debugWorkoutSchedule, debugMealPlan,
        debugPersonalBests, debugAchievements } from "../data/debugDataSets";

export default function HomeScreen({ navigation }) {
  function debugStuff() {
    let dateToday = new Date().toDateString();
    let dateYesterday = new Date(2024, 3, 17).toDateString();
    console.log(dateToday);
    console.log(dateYesterday);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>To-Do:</Text>
      <Pressable onPress={debugStuff}>
        <Text style={styles.debug}>Scuffed Debug Button</Text>
      </Pressable>
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
    // color: "#F4F5F5"
  },
  debug: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 48,
    marginBottom: 16,
    // color: "#F4F5F5"
  }
})
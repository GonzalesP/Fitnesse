import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

export default function HomeScreen({ navigation }) {
  function debugStuff() {
    let dateToday = new Date().toDateString();
    let dateYesterday = new Date(2024, 3, 17).toDateString();
    console.log(dateToday);
    console.log(dateYesterday);
  }

  function todoCards() {
    // check if user hasn't calculated Weight Goal (Async)
    let userWeightHistory = null;
    let userHeight = 1;
    if (userWeightHistory == null || userHeight == null) {
      // return conditionally rendered elements - can change state after finishing task
      return (
        <Pressable onPress={() => navigation.navigate('Profile Stack', { screen: 'Weight Goal' })}>
          <Text style={styles.testText}>Calculate Your Weight Goal</Text>
        </Pressable>
      );
    }

    // check if user hasn't recorded Today's Weight (Async)
    let dateToday = new Date().toDateString();
    let latestDayRecorded = new Date(2024, 3, 18).toDateString();
    if (dateToday != latestDayRecorded) {
      return (
        <Pressable onPress={() => navigation.navigate('Profile Stack', { screen: 'Record Weight' })}>
          <Text style={styles.testText}>Record Today's Weight</Text>
        </Pressable>
      );
    }

    // otherwise, nothing else to do
    return <Text style={styles.testText}>All Done!</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>To-Do:</Text>
      {todoCards()}
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
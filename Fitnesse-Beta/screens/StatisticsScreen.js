import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StatisticsScreen({ navigation }) {
  const [weightHistory, setWeightHistory] = useState();
  const [personalBests, setPersonalBests] = useState();

  const [weightChange, setWeightChange] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getUserData() {
    // fetch data from AsyncStorage
    let wh;
    let pb;
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      wh = JSON.parse(await AsyncStorage.getItem('demoWeightHistory'));
      pb = JSON.parse(await AsyncStorage.getItem('demoPersonalBests'));

      setWeightHistory(wh);
      setPersonalBests(pb);
      setWeightChange('select a filter');
    }
    else {
      // getItem userWeightHistory and userPersonalBests
    }
    // remove loading screen
    setLoading(false);
  }

  function calculateWeightChange(selectedView) {
    let todayIndex = weightHistory.length - 1;
    let currentWeight = weightHistory[todayIndex]["weight"];
    let totalChange;

    if (selectedView == 'day') {
      if (weightHistory.length >= 2) {
        totalChange = currentWeight - weightHistory[todayIndex - 1]["weight"];
      }
      else {
        totalChange = currentWeight - weightHistory[0]["weight"];
      }
    }
    else if (selectedView == 'week') {
      if (weightHistory.length >= 8) {
        totalChange = currentWeight - weightHistory[todayIndex - 7]["weight"];
      }
      else {
        totalChange = currentWeight - weightHistory[0]["weight"];
      }
    }
    else if (selectedView == 'month') {
      if (weightHistory.length >= 32) {
        totalChange = currentWeight - weightHistory[todayIndex - 31]["weight"];
      }
      else {
        totalChange = currentWeight - weightHistory[0]["weight"];
      }
    }
    else if (selectedView == 'year') {
      if (weightHistory.length >= 366) {
        totalChange = currentWeight - weightHistory[todayIndex - 365]["weight"];
      }
      else {
        totalChange = currentWeight - weightHistory[0]["weight"];
      }
    }
    else {
      totalChange = currentWeight - weightHistory[0]["weight"];
    }

    if (totalChange <= 0) {
      setWeightChange(`You lost ${Math.abs(totalChange.toFixed(2))} lbs.`);
    }
    else {
      setWeightChange(`You gained ${totalChange.toFixed(2)} lbs.`)
    }
  }

  function renderPersonalBests({ item }) {
    let pbValue = personalBests[item]["personalBest"];
    let pbDate = personalBests[item]["date"]
    return (
      <View key={item}>
        <Text>{item}: {pbValue ? pbValue : "N/A"}</Text>
        <Text>Date: {pbDate ? pbDate : "N/A"}</Text>
      </View>
    );
  }

  if (loading) {
    getUserData();
    return (
      <View>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        <Pressable onPress={() => navigation.navigate("Achievements")}>
          <Text style={styles.text}>Go to 'Achievements' screen</Text>
        </Pressable>
  
        <Text style={styles.text}>Weight Progress</Text>
        <View style={styles.filterContainer}>
          <Pressable onPress={calculateWeightChange.bind(this, 'day')}>
            <Text>1 Day</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'week')}>
            <Text>1 Week</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'month')}>
            <Text>1 Month</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'year')}>
            <Text>1 Year</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'all time')}>
            <Text>All Time</Text>
          </Pressable>
        </View>
        <Text>{weightChange}</Text>
  
        <Text style={styles.text}>Personal Bests</Text>
        <FlatList
          data={Object.keys(personalBests)}
          renderItem={renderPersonalBests}
        />
      </View>
    );
  }
};

// #225588
// #F4F5F5
// #E17000
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  }
})
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function StatisticsScreen({ navigation }) {
  const [weightHistory, setWeightHistory] = useState();
  const [personalBests, setPersonalBests] = useState();

  const [filter, setFilter] = useState();
  const [weightChange, setWeightChange] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [previousWeight, setPreviousWeight] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setFilter();
    setCurrentWeight('');
    setPreviousWeight('');
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
      wh = JSON.parse(await AsyncStorage.getItem('userWeightHistory'));
      pb = JSON.parse(await AsyncStorage.getItem('userPersonalBests'));

      setWeightHistory(wh);
      setPersonalBests(pb);
      setWeightChange('select a filter');
    }
    // remove loading screen
    setLoading(false);
  }

  function calculateWeightChange(selectedView) {
    setFilter(selectedView)
    if (weightHistory == null) {
      setWeightChange(`No Weight History recorded yet`)
      return;
    }

    let todayIndex = weightHistory.length - 1;
    let currentWeight = weightHistory[todayIndex]["weight"];
    let previousWeight;
    let totalChange;

    if (selectedView == 'day') {
      if (weightHistory.length >= 2) {
        previousWeight = weightHistory[todayIndex - 1]["weight"];
      }
      else {
        previousWeight = weightHistory[0]["weight"];
      }
    }
    else if (selectedView == 'week') {
      if (weightHistory.length >= 8) {
        previousWeight = weightHistory[todayIndex - 7]["weight"];
      }
      else {
        previousWeight = weightHistory[0]["weight"];
      }
    }
    else if (selectedView == 'month') {
      if (weightHistory.length >= 32) {
        previousWeight = weightHistory[todayIndex - 31]["weight"];
      }
      else {
        previousWeight = weightHistory[0]["weight"];
      }
    }
    else if (selectedView == 'year') {
      if (weightHistory.length >= 366) {
        previousWeight = weightHistory[todayIndex - 365]["weight"];
      }
      else {
        previousWeight = weightHistory[0]["weight"];
      }
    }
    else {
      previousWeight = weightHistory[0]["weight"];
    }

    totalChange = currentWeight - previousWeight;
    if (totalChange <= 0) {
      setWeightChange(`You lost ${Math.abs(totalChange.toFixed(2))} lbs.`);
    }
    else {
      setWeightChange(`You gained ${totalChange.toFixed(2)} lbs.`)
    }

    setCurrentWeight(currentWeight)
    setPreviousWeight(previousWeight)
  }

  if (loading) {
    getUserData();
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  else {
    return (
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Weight Progress</Text>
          <Pressable onPress={() => navigation.navigate("Achievements")}>
            <Ionicons name={"trophy-sharp"} size={30} style={{color: "black"}} />
          </Pressable>
        </View>
  
        <View style={styles.filterContainer}>
          <Pressable onPress={calculateWeightChange.bind(this, 'day')}>
            <Text style={
              filter == 'day' ? styles.activeFilterText : styles.inactiveFilterText
              }>Day</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'week')}>
            <Text style={
              filter == 'week' ? styles.activeFilterText : styles.inactiveFilterText
              }>Week</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'month')}>
            <Text style={
              filter == 'month' ? styles.activeFilterText : styles.inactiveFilterText
              }>Month</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'year')}>
            <Text style={
              filter == 'year' ? styles.activeFilterText : styles.inactiveFilterText
              }>Year</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'all time')}>
            <Text style={
              filter == 'all time' ? styles.activeFilterText : styles.inactiveFilterText
              }>All Time</Text>
          </Pressable>
        </View>
        <View style={styles.weightChangeContainer}>
          <Text style={styles.weightChangeHeader}>{weightChange}</Text>
          <Text style={styles.weightChangeText}><Text style={styles.weightChangeHeader}>Current Weight: </Text>{currentWeight}</Text>
          <Text style={styles.weightChangeText}><Text style={styles.weightChangeHeader}>Previous Weight: </Text>{previousWeight}</Text>
        </View>
  
        <View style={styles.personalBestContainer}>
          <Text style={styles.headerText}>Personal Bests</Text>

          {Object.keys(personalBests).map((item) => {
            let pbValue = personalBests[item]["personalBest"];
            let pbDate = personalBests[item]["date"]

            return (
              <View key={item} style={styles.personalBestCard}>
                <View style={styles.pbCardHeaderContainer}>
                  <Text style={styles.pbNameText}>{item}:</Text>
                  <Text style={styles.pbScoreText}>
                    { pbValue ? pbValue : "not set" }
                  </Text>
                </View>
                <Text style={styles.pbDateText}>
                  {pbDate ? pbDate : ""}
                </Text>
              </View>
            );
          })}
          <View style={{ height: 16 }}></View>
        </View>
      </ScrollView>
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
    backgroundColor: "#C3DCF6"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold"
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 16,
    marginBottom: 24
  },
  activeFilterText: {
    fontSize: 20,
    height: 32,
    backgroundColor: "#F58220",
    borderWidth: 2,
    borderRadius: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 4,
  },
  inactiveFilterText: {
    fontSize: 20,
    height: 32,
    backgroundColor: "#9DBED8",
    borderWidth: 2,
    borderRadius: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 4
  },
  weightChangeContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  weightChangeHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  weightChangeText: {
    fontSize: 20,
    textAlign: "center"
  },
  personalBestContainer: {
    paddingHorizontal: 16
  },
  personalBestCard: {
    backgroundColor: "#FFF",
    marginTop: 16,
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
  },
  pbCardHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  pbNameText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  pbScoreText: {
    fontSize: 22
  },
  pbDateText: {
    fontSize: 16,
    fontStyle: "italic"
  }
})
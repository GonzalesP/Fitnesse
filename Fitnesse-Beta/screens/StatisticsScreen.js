import { View, Text, StyleSheet, Pressable, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

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
            <Text style={styles.filterText}>Day</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'week')}>
            <Text style={styles.filterText}>Week</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'month')}>
            <Text style={styles.filterText}>Month</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'year')}>
            <Text style={styles.filterText}>Year</Text>
          </Pressable>
          <Pressable onPress={calculateWeightChange.bind(this, 'all time')}>
            <Text style={styles.filterText}>All Time</Text>
          </Pressable>
        </View>
        <View style={styles.weightChangeContainer}>
          <Text style={styles.weightChangeText}>{weightChange}</Text>
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
                    { pbValue ? pbValue : "N/A" }
                  </Text>
                </View>
                <Text style={styles.pbDateText}>
                  {pbDate ? pbDate : "N/A"}
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
    alignItems: "center"
  },
  bodyContainer: {
    flex: 1,
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
  filterText: {
    fontSize: 16
  },
  weightChangeContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  weightChangeText: {
    fontSize: 20,
    fontWeight: "bold"
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
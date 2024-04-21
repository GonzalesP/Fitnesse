import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StatisticsScreen({ navigation }) {
  const [weightHistory, setWeightHistory] = useState();
  const [personalBests, setPersonalBests] = useState();

  const [viewWeight, setWeightView] = useState('week');
  const [weightChange, setWeightChange] = useState('');

  const [loading, setLoading] = useState();

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

      // console.log(personalBests["back squat"])
      // console.log(Object.keys(personalBests))
    }
    else {
      // getItem userWeightHistory and userPersonalBests
    }
    // remove loading screen
    setLoading(false);
  }

  async function renderPersonalBests({ item }) {
    console.log(item);
    // let pbValue = personalBests[item]["personalBest"];
    // let pbDate = personalBests[item]["date"]
    // return (
    //   <View key={item}>
    //     <Text>{item}: {pbValue ? pbValue : "N/A"}</Text>
    //     <Text>Date: {pbDate ? pbDate : "N/A"}</Text>
    //   </View>
    // );
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
  
        <Text style={styles.text}>Weight History</Text>
        <View style={styles.filterContainer}>
          <Pressable onPress={setWeightView.bind(this, 'day')}>
            <Text>1 Day</Text>
          </Pressable>
          <Pressable onPress={setWeightView.bind(this, 'week')}>
            <Text>1 Week</Text>
          </Pressable>
          <Pressable onPress={setWeightView.bind(this, 'month')}>
            <Text>1 Month</Text>
          </Pressable>
          <Pressable onPress={setWeightView.bind(this, 'year')}>
            <Text>1 Year</Text>
          </Pressable>
          <Pressable onPress={setWeightView.bind(this, 'all time')}>
            <Text>All Time</Text>
          </Pressable>
        </View>
        <Text>{weightChange}</Text>
  
        <Text style={styles.text}>Personal Bests</Text>
        {/* <FlatList
          data={Object.keys(personalBests)}
          renderItem={renderPersonalBests}
        /> */}
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
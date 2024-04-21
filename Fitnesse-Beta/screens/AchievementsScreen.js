import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AchievementsScreen({ navigation }) {
  const [achievements, setAchievements] = useState();
  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getAchievements() {
    // fetch data from AsyncStorage
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      let ac = JSON.parse(await AsyncStorage.getItem('demoAchievements'));
      setAchievements(ac);
    }
    else {
      // getItem userAchievements
    }
    // remove loading screen
    setLoading(false);
  }

  function renderAchievements({ item }) {
    if (achievements[item].length == 0) {
      return (
        <View key={item}>
          <Text>{item}</Text>
          <Text>No achievements unlocked.</Text>
        </View>
      );
    }
    else {
      return (
        <View key={item}>
          <Text>{item}</Text>
          {
            // date description name
            achievements[item].map((achObject) => {
              return (
                <View key={achObject["name"]}>
                  <Text>{achObject["name"]}</Text>
                  <Text>{achObject["description"]}</Text>
                  <Text>Date Unlocked: {achObject["date"]}</Text>
                </View>
              );
            })
          }
        </View>
      )
    }
  }


  
  if (loading) {
    getAchievements();
    return (
      <View>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  } else {
    return (
      <View style={styles.bodyContainer}>
        <FlatList
          data={Object.keys(achievements)}
          renderItem={renderAchievements}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
})
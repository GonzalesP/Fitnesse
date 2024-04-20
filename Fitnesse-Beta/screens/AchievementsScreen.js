import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AchievementsScreen({ navigation }) {
  const [achievements, setAchievements] = useState();
  const [loading, setLoading] = useState(true);

  const getAchievements = navigation.addListener('focus', async() => {
    // show loading screen
    setLoading(true);
    // fetch data from AsyncStorage
    let debugMode = await AsyncStorage.getItem('debugMode');
    if (debugMode == "on") {
      let ac = JSON.parse(await AsyncStorage.getItem('debugAchievements'));
      setAchievements(ac);
    }
    else {
      // getItem userAchievements
    }
    // remove loading screen
    setLoading(false);
  });

  function renderAchievementsFlatList() {
    let oneMileRunAchievements = Object.keys(achievements);
    return (
      <FlatList
        data={oneMileRunAchievements}
        renderItem={renderExerciseAchievements}
      />
    );
  }

  function renderExerciseAchievements({ item }) {
    let exerciseAchievements = achievements[item];
    if (exerciseAchievements.length == 0) {
      return (
        <View key={item}>
          <Text>{item}:</Text>
          <Text>nothing unlocked yet</Text>
        </View>
      );
    }
    else {
      return (
        <View key={item}>
          <Text>{item}:</Text>
          {
            exerciseAchievements.map((achievement) => (
              <View key={achievement.name}>
                <Text>{achievement.name}</Text>
                <Text>{achievement.description}</Text>
                <Text>{achievement.date}</Text>
              </View>
            ))
          }
        </View>
      )
    }
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  } else {
    return (
      <View style={styles.bodyContainer}>
        {renderAchievementsFlatList()}
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
})
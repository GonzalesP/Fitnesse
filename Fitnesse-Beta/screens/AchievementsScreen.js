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
    let ac;
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      ac = JSON.parse(await AsyncStorage.getItem('demoAchievements'));
      setAchievements(ac);
    }
    else {
      ac = JSON.parse(await AsyncStorage.getItem('userAchievements'));
      setAchievements(ac);
    }
    // remove loading screen
    setLoading(false);
  }

  function renderAchievements({ item }) {
    if (achievements[item].length == 0) {
      return (
        <View key={item}>
          <Text style={styles.headerText}>{item}</Text>
          <Text style={styles.achievementDesc}>No achievements unlocked.</Text>
        </View>
      );
    }
    else {
      return (
        <View key={item}>
          <Text style={styles.headerText}>{item}</Text>
          {/* render all achievements using Array.map() */}
          {
            // achievements[item]: date description name
            achievements[item].map((achObject) => {
              return (
                <View key={achObject["name"]} style={styles.achievementContainer}>
                  <Text style={styles.achievementName}>{achObject["name"]}</Text>
                  <Text style={styles.achievementDesc}>{achObject["description"]}</Text>
                  <Text style={styles.achievementDate}>{achObject["date"]}</Text>
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.bodyContainer}>
        <FlatList
          data={Object.keys(achievements)}
          renderItem={renderAchievements}
          ItemSeparatorComponent={<View style={{ height: 36 }}></View>}
          ListHeaderComponent={<View style={{ height: 16 }}></View>}
          ListFooterComponent={<View style={{ height: 16 }}></View>}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C3DCF6"
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "#C3DCF6"
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold"
  },
  achievementContainer: {
    backgroundColor: "#FFF",
    marginTop: 16,
    padding: 8,
    borderWidth: 2,
    borderRadius: 16
  },
  achievementName: {
    fontSize: 22,
    fontWeight: "bold"
  },
  achievementDesc: {
    fontSize: 18,
  },
  achievementDate: {
    fontStyle: 'italic',
    fontSize: 12
  }
})
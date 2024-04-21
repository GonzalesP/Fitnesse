import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { mpDefault, mpVegetarian, mpHBP, mpDiabetes, mpAntiInflam } from "../data/mealPlanDataSets";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdateDietScreen({ navigation }) {
  const [currentDiet, setCurrentDiet] = useState();
  const [dietChoice, setDietChoice] = useState();

  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getDiet() {
    // fetch data from AsyncStorage
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      let mp = JSON.parse(await AsyncStorage.getItem('demoMealPlan'));
      setCurrentDiet(mp["dietType"]);
    }
    else {
      // getItem userMealPlan
    }
    // remove loading screen
    setLoading(false);
  }

  async function saveUserInput() {
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      if (dietChoice == "default") {
        await AsyncStorage.setItem('demoMealPlan', JSON.stringify(mpDefault))
      }
      else if (dietChoice == "vegetarian") {
        await AsyncStorage.setItem('demoMealPlan', JSON.stringify(mpVegetarian))
      }
      else if (dietChoice == "high blood pressure") {
        await AsyncStorage.setItem('demoMealPlan', JSON.stringify(mpHBP))
      }
      else if (dietChoice == "diabetes") {
        await AsyncStorage.setItem('demoMealPlan', JSON.stringify(mpDiabetes))
      }
      else if (dietChoice == "anti-inflammatory") {
        await AsyncStorage.setItem('demoMealPlan', JSON.stringify(mpAntiInflam))
      }
    }
    else {
      // setItem userMealPlan
    }

    navigation.navigate("Profile")
  }



  if (loading) {
    getDiet();
    return (
      <View>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        <Text>Current Diet: {currentDiet}</Text>
        <View>
          <Pressable onPress={setDietChoice.bind(this, 'default')}>
            <Text style={styles.text}>Default</Text>
          </Pressable>
          <Pressable onPress={setDietChoice.bind(this, 'vegetarian')}>
            <Text style={styles.text}>Vegetarian</Text>
          </Pressable>
          <Pressable onPress={setDietChoice.bind(this, 'high blood pressure')}>
            <Text style={styles.text}>High Blood Pressure</Text>
          </Pressable>
          <Pressable onPress={setDietChoice.bind(this, 'diabetes')}>
            <Text style={styles.text}>Diabetes</Text>
          </Pressable>
          <Pressable onPress={setDietChoice.bind(this, 'anti-inflammatory')}>
            <Text style={styles.text}>Anti-Inflammatory</Text>
          </Pressable>
        </View>
        {
          dietChoice &&
          <View>
            <Text>Selected Diet: {dietChoice}</Text>
            <Pressable onPress={saveUserInput}>
              <Text style={styles.text}>Confirm</Text>
            </Pressable>
          </View>
        }
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
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  }
})
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        {/* display current diet */}
        <View style={styles.traitContainer}>
          <Text style={styles.traitText}>Current Diet: </Text>
          <Text style={styles.valueText}>{currentDiet}</Text>
        </View>

        {/* button options */}
        <View style={styles.optionContainer}>
          <Pressable onPress={setDietChoice.bind(this, 'default')}>
            <Text style={styles.optionText}>Default</Text>
          </Pressable>
          <Pressable onPress={setDietChoice.bind(this, 'vegetarian')}>
            <Text style={styles.optionText}>Vegetarian</Text>
          </Pressable>
          <Pressable onPress={setDietChoice.bind(this, 'high blood pressure')}>
            <Text style={styles.optionText}>High Blood Pressure</Text>
          </Pressable>
          <Pressable onPress={setDietChoice.bind(this, 'diabetes')}>
            <Text style={styles.optionText}>Diabetes</Text>
          </Pressable>
          <Pressable onPress={setDietChoice.bind(this, 'anti-inflammatory')}>
            <Text style={styles.optionText}>Anti-Inflammatory</Text>
          </Pressable>
        </View>

        {/* display selected diet */}
        {
          dietChoice &&
          <View>
            <View style={{ height: 16 }}></View>
            <View style={styles.traitContainer}>
              <Text style={styles.traitText}>Selected Diet: </Text>
              <Text style={styles.valueText}>{dietChoice}</Text>
            </View>
            <Pressable onPress={saveUserInput}>
              <Text style={styles.buttonText}>Confirm</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 0
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    margin: 4,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#9dce71",
    alignSelf: "flex-start"
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 16
  },
  traitContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  traitText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  valueText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    marginTop: 12,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#719dcd",
    alignSelf: "flex-start"
  }
})
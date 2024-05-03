import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBMI] = useState();

  const [fitGoal, setFitGoal] = useState();
  const [diet, setDiet] = useState();
  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getProfile() {
    // fetch data from AsyncStorage
    let ht;  // height
    let wh;  // weight history
    let mp;  // meal plan (diet)
    let fg;  // fitness goal

    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      ht = JSON.parse(await AsyncStorage.getItem('demoHeight'));
      wh = JSON.parse(await AsyncStorage.getItem('demoWeightHistory'));
      mp = JSON.parse(await AsyncStorage.getItem('demoMealPlan'));
      fg = await AsyncStorage.getItem('demoFitnessGoal');
    }
    else {
      ht = JSON.parse(await AsyncStorage.getItem('userHeight'));
      wh = JSON.parse(await AsyncStorage.getItem('userWeightHistory'));
      mp = JSON.parse(await AsyncStorage.getItem('userMealPlan'));
      fg = await AsyncStorage.getItem('userFitnessGoal');
    }
    // update height and weight
    setHeight(ht != null ? `${ht["feet"]}'${ht["inches"]}"` : "N/A");
    setWeight(wh != null ? wh[wh.length-1]["weight"] : "N/A");
    // update bmi
    if (ht != null && wh != null) {
      let totalInches = 12 * Number.parseFloat(ht["feet"])
                        + Number.parseFloat(ht["inches"]);
      setBMI(((703 * wh[wh.length-1]["weight"]) / (totalInches**2)).toFixed(2))
    }
    else {
      setBMI("N/A")
    }
    // update fitness goal
    setFitGoal(fg)

    // update diet
    setDiet(mp["dietType"])

    // remove loading screen
    setLoading(false);
  }
  


  // show loading screen
  if (loading) {
    getProfile();
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.attributeContainer}>
          <Text style={styles.headerText}>Body Composition</Text>
          <View style={styles.traitContainer}>
            <Text style={styles.traitText}>Height: </Text>
            <Text style={styles.valueText}>{height}</Text>
          </View>
          <View style={styles.traitContainer}>
            <Text style={styles.traitText}>Weight: </Text>
            <Text style={styles.valueText}>{weight}</Text>
          </View>
          <View style={styles.traitContainer}>
            <Text style={styles.traitText}>BMI: </Text>
            <Text style={styles.valueText}>{bmi}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => navigation.navigate("Update Height Weight")}>
              <Text style={styles.buttonText}>Update Height and Weight</Text>
            </Pressable>
            <View style={{ height: 8 }}></View>
            <Pressable onPress={() => navigation.navigate("Record Weight")}>
              <Text style={styles.buttonText}>Record Today's Weight</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.headerText}>Workout Schedule</Text>
          <View style={styles.traitContainer}>
            <Text style={styles.traitText}>Fitness Goal: </Text>
            <Text style={styles.valueText}>{fitGoal}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => navigation.navigate("Update Fitness Goal")}>
              <Text style={styles.buttonText}>Edit Fitness Goal</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.headerText}>Meal Plan</Text>
          <View style={styles.traitContainer}>
            <Text style={styles.traitText}>Diet: </Text>
            <Text style={styles.valueText}>{diet}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => navigation.navigate("Update Diet")}>
              <Text style={styles.buttonText}>Edit Diet</Text>
            </Pressable>
          </View>
        </View>
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
  attributeContainer: {
    marginBottom: 16
  },
  buttonContainer: {
    paddingTop: 16
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#719dcd",
    alignSelf: "flex-start"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 8,
  },
  traitContainer: {
    flexDirection: "row"
  },
  traitText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  valueText: {
    fontSize: 18,
  }
})
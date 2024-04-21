import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBMI] = useState();
  const [diet, setDiet] = useState();
  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getProfile() {
    // fetch data from AsyncStorage
    let demoMode = await AsyncStorage.getItem('demoMode');
    let ht;
    let wh;
    let mp;
    if (demoMode == "on") {
      ht = JSON.parse(await AsyncStorage.getItem('demoHeight'));
      wh = JSON.parse(await AsyncStorage.getItem('demoWeightHistory'));
      mp = JSON.parse(await AsyncStorage.getItem('demoMealPlan'));
    }
    else {
      // getItem userHeight and stuff
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
    // update diet
    setDiet(mp["dietType"])

    // remove loading screen
    setLoading(false);
  }
  


  // show loading screen
  if (loading) {
    getProfile();
    return (
      <View>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        <View>
          <Text>Body Composition</Text>
          <Text>Height: {height}</Text>
          <Text>Weight: {weight}</Text>
          <Text>BMI: {bmi}</Text>
          <Pressable onPress={() => navigation.navigate("Update Height Weight")}>
            <Text style={styles.text}>Update Height and Weight</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Record Weight")}>
            <Text style={styles.text}>Update Today's Weight</Text>
          </Pressable>
        </View>
        <View>
          <Text>Meal Plan</Text>
          <Text>Diet: {diet}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Update Diet")}>
            <Text style={styles.text}>Edit Diet</Text>
          </Pressable>
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
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getProfile() {
    // fetch data from AsyncStorage
    let debugMode = await AsyncStorage.getItem('debugMode');
    if (debugMode == "on") {
      let ht = JSON.parse(await AsyncStorage.getItem('debugHeight'));
      let wh = JSON.parse(await AsyncStorage.getItem('debugWeightHistory'));
      setHeight(ht);
      setWeight(wh);
    }
    else {
      // getItem userHeight and stuff
    }
    // remove loading screen
    setLoading(false);
  }

  function calculateBMI() {
    let totalInches = 12 * height["feet"] + height["inches"];
    return ((703 * weight[weight.length-1]["weight"]) / totalInches**2).toFixed(1);
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
        <Text>Height: {height != null ? `${height["feet"]}'${height["inches"]}"` : "N/A"}</Text>
        <Text>Weight: {weight != null ? weight[weight.length-1]["weight"] : "N/A"}</Text>
        <Text>BMI: {(height != null && weight != null)
                      ? calculateBMI() : "N/A"}</Text>
        <Pressable onPress={() => navigation.navigate("Update Weight and Height")}>
          <Text style={styles.text}>Update Height and Weight</Text>
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
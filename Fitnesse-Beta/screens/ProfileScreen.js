import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [loading, setLoading] = useState(true);

  const getProfile = navigation.addListener('focus', async() => {
    // show loading screen
    setLoading(true);
    // fetch data from AsyncStorage
    let debugMode = await AsyncStorage.getItem('debugMode');
    if (debugMode == "on") {
      let ht = JSON.parse(await AsyncStorage.getItem('debugHeight'))
      let wh = JSON.parse(await AsyncStorage.getItem('debugWeightHistory'))
      let wt = wh[wh.length - 1]["weight"]

      setHeight(ht);
      setWeight(wt);
    }
    else {
      // getItem userHeight and stuff
    }
    // remove loading screen
    setLoading(false);
  });

  function computeBMI() {
    let totalInches = 12*height["feet"] + height["inches"]
    return ((703 * weight) / (totalInches**2)).toFixed(2);
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        <Pressable onPress={() => navigation.navigate("Weight Goal")}>
          <Text style={styles.text}>Go to 'Weight Goal' screen</Text>
        </Pressable>
        <Text>Height: {height["feet"]}'{height["inches"]}"</Text>
        <Text>Weight: {weight} lbs.</Text>
        <Text>BMI: {computeBMI()}</Text>
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
    marginBottom: 16,
  }
})
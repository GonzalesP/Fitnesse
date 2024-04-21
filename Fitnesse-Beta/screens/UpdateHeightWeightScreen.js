import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdateHeightWeightScreen({ navigation }) {
  const [feetInput, setFeetInput] = useState();
  const [inchesInput, setInchesInput] = useState();
  const [weightInput, setWeightInput] = useState();
  const [showError, setShowError] = useState(false);

  async function saveUserInput() {
    if (!feetInput || !inchesInput || !weightInput) {
      setShowError(true);
      return;
    }
    setShowError(false);

    // create height object
    let height = {
      "feet": feetInput,
      "inches": inchesInput
    }

    // create weight object
    let today = new Date().toDateString();
    let weight = {
      "date": today,
      "weight": weightInput
    };

    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      // update height
      await AsyncStorage.setItem('demoHeight', JSON.stringify(height));

      // update weight
      let weightHistory = JSON.parse(await AsyncStorage.getItem('demoWeightHistory'));

      if (weightHistory != null) {
        lastWeightRecorded = weightHistory[weightHistory.length - 1]
        if (today != lastWeightRecorded["date"]) {  // weight not recorded today
          weightHistory.push(weight);
        }
        else {
          weightHistory[weightHistory.length - 1] = weight;
        }
      }
      else {  // weight is null
        weightHistory = [weight];
      }

      await AsyncStorage.setItem('demoWeightHistory', JSON.stringify(weightHistory))
    }
    else {
      // user data
    }

    navigation.navigate("Profile")
  }

  return (
    <View style={styles.bodyContainer}>
      <Text>Height</Text>
      <TextInput
        style={styles.input}
        value={feetInput}
        onChangeText={setFeetInput}
        keyboardType="numeric"
      />
      <Text>ft.</Text>
      <TextInput
        style={styles.input}
        value={inchesInput}
        onChangeText={setInchesInput}
        keyboardType="numeric"
      />
      <Text>in.</Text>

      <Text>Weight</Text>
      <TextInput
        style={styles.input}
        value={weightInput}
        onChangeText={setWeightInput}
        keyboardType="numeric"
      />
      <Text>lbs.</Text>

      {showError && <Text style={{color: "red"}}>Please fill in all fields</Text>}
      <Pressable onPress={saveUserInput}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
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
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
})
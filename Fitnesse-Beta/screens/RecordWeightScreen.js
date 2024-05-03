import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecordWeightScreen({ navigation }) {
  const [weightInput, setWeightInput] = useState();
  const [showError, setShowError] = useState(false);

  async function saveUserInput() {
    if (!weightInput) {
      setShowError(true);
      return;
    }
    setShowError(false);

    // create weight object
    let today = new Date().toDateString();
    let weight = {
      "date": today,
      "weight": weightInput
    };

    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      // update weight
      let weightHistory = JSON.parse(await AsyncStorage.getItem('demoWeightHistory'));

      if (weightHistory != null) {
        lastWeightRecorded = weightHistory[weightHistory.length - 1];
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

      await AsyncStorage.setItem('demoWeightHistory', JSON.stringify(weightHistory));
    }
    else {
      // update weight
      let weightHistory = JSON.parse(await AsyncStorage.getItem('userWeightHistory'));

      if (weightHistory != null) {
        lastWeightRecorded = weightHistory[weightHistory.length - 1];
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

      await AsyncStorage.setItem('userWeightHistory', JSON.stringify(weightHistory));
    }

    navigation.navigate("Profile")
  }

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.headerText}>Weight: </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={weightInput}
          onChangeText={setWeightInput}
          keyboardType="numeric"
        />
        <Text style={styles.labelText}>lbs.</Text>
      </View>
      
      <Pressable onPress={saveUserInput}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      {showError && <Text style={{color: "red"}}>Please fill in all fields</Text>}
    </View>
  );
};

// #225588
// #F4F5F5
// #E17000
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 0
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  labelText: {
    fontSize: 24,
    marginLeft: 8,
    marginRight: 16
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    marginTop: 16,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#719dcd",
    alignSelf: "flex-start"
  }
})
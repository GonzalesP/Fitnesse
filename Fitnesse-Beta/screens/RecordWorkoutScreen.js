import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, FlatList } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecordWorkoutScreen({ navigation }) {
  const currentDay = new Date().getDay();

  const [workout, setWorkout] = useState();
  const [personalBests, setPersonalBests] = useState();
  const [achievements, setAchievements] = useState();
  
  const [exerciseInputs, setExerciseInputs] = useState({});
  const [loading, setLoading] = useState();

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getWorkout() {
    let ws;
    let pb;
    let ac;
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      ws = JSON.parse(await AsyncStorage.getItem('demoWorkoutSchedule'));
      pb = JSON.parse(await AsyncStorage.getItem('demoPersonalBests'));
      ac = JSON.parse(await AsyncStorage.getItem('demoAchievements'));
    }
    else {
      ws = JSON.parse(await AsyncStorage.getItem('userWorkoutSchedule'));
      pb = JSON.parse(await AsyncStorage.getItem('userPersonalBests'));
      ac = JSON.parse(await AsyncStorage.getItem('userAchievements'));
    }

    // // this is a sample workout to test out all input options
    // let painWorkout = [
    //   {
    //     "id": 1,
    //     "exerciseName": "bench press",
    //     "sets": 1,
    //     "reps": 1,
    //     "duration": null
    //   },
    //   {
    //     "id": 2,
    //     "exerciseName": "back squat",
    //     "sets": 1,
    //     "reps": 1,
    //     "duration": null
    //   },
    //   {
    //     "id": 3,
    //     "exerciseName": "deadlift",
    //     "sets": 1,
    //     "reps": 1,
    //     "duration": null
    //   }
    // ];
    
    // setWorkout(painWorkout);
    setWorkout(ws[currentDay]["exercises"]);
    setPersonalBests(pb);
    setAchievements(ac);
    setLoading(false);
  }

  // duration, exerciseName, id, reps, sets
  function renderExerciseInputs({ item }) {
    if (item.exerciseName == "bench press" ||
        item.exerciseName == "back squat" ||
        item.exerciseName == "deadlift"
    ) {
      return (
        <View>
          <Text style={styles.headerText}>{item.exerciseName + ":"}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                let currentInputs = exerciseInputs;
                currentInputs[item.exerciseName] = text;
                setExerciseInputs(currentInputs);
              }}
              keyboardType="numeric"
            />
            <Text style={styles.labelText}>lbs.</Text>
          </View>
        </View>
      );
    }
  }

  // when submitting, check if any PBs should be updated
  async function comparePBs() {
    let pbCopy = personalBests;

    // compare bench press PB
    if (exerciseInputs["bench press"]) {
      if (pbCopy["bench press"]["personalBest"] == null ||
          pbCopy["bench press"]["personalBest"] < exerciseInputs["bench press"]
      ) {
        pbCopy["bench press"]["personalBest"] = exerciseInputs["bench press"];
        pbCopy["bench press"]["date"] = new Date().toDateString();
      }
    }

    // compare back squat PB
    if (exerciseInputs["back squat"]) {
      if (pbCopy["back squat"]["personalBest"] == null ||
          pbCopy["back squat"]["personalBest"] < exerciseInputs["back squat"]
      ) {
        pbCopy["back squat"]["personalBest"] = exerciseInputs["back squat"];
        pbCopy["back squat"]["date"] = new Date().toDateString();
      }
    }

    // compare deadlift PB
    if (exerciseInputs["deadlift"]) {
      if (pbCopy["deadlift"]["personalBest"] == null ||
          pbCopy["deadlift"]["personalBest"] < exerciseInputs["deadlift"]
      ) {
        pbCopy["deadlift"]["personalBest"] = exerciseInputs["deadlift"];
        pbCopy["deadlift"]["date"] = new Date().toDateString();
      }
    }

    // update AsyncStorage (either demo or user PBs)
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      await AsyncStorage.setItem('demoPersonalBests', JSON.stringify(pbCopy))
    }
    else {
      await AsyncStorage.setItem('userPersonalBests', JSON.stringify(pbCopy))
    }

    return "done";
  }

  // check if an achievement has already been unlocked.
  // if not, it will be added via checkAchievements()
  function isUnlocked(achievementList, achievementName) {
    for (let i = 0; i < achievementList.length; i++) {
      // list of achievement Objects: name, description, date
      if (achievementList[i]["name"] == achievementName) {
        return true;
      }
    }
    return false;
  }

  // when submitting, check if any Achievements should be added
  async function checkAchievements() {
    let acCopy = achievements;
    
    // bench press achievements
    if (exerciseInputs["bench press"]) {
      // bench press input
      let bpInput = exerciseInputs["bench press"];
      // copy of bench press achievements (list)
      let bpAchievements = acCopy["bench press"];

      // One Star Bench - condition met and not unlocked yet
      if (bpInput >= 135 && !isUnlocked(bpAchievements, "One Star Bench")) {
        // create the One Star Bench achievement Object
        let newAchievement = {
          "name": "One Star Bench",
          "description": "Bench Press 1 Plate (135+ lbs.)",
          "date": new Date().toDateString()
        }
        // add it to the list of achievements
        acCopy["bench press"].push(newAchievement);
      }

      // Two Star Bench
      if (bpInput >= 225 && !isUnlocked(bpAchievements, "Two Star Bench")) {
        let newAchievement = {
          "name": "Two Star Bench",
          "description": "Bench Press 2 Plates (225+ lbs.)",
          "date": new Date().toDateString()
        }

        acCopy["bench press"].push(newAchievement);
      }

      // Three Star Bench
      if (bpInput >= 315 && !isUnlocked(bpAchievements, "Three Star Bench")) {
        let newAchievement = {
          "name": "Three Star Bench",
          "description": "Bench Press 3 Plates (315+ lbs.)",
          "date": new Date().toDateString()
        }

        acCopy["bench press"].push(newAchievement);
      }

      // Bench Beast
      if (bpInput >= 405 && !isUnlocked(bpAchievements, "Bench Beast")) {
        let newAchievement = {
          "name": "Bench Beast",
          "description": "Bench Press 4 Plates (405+ lbs.)",
          "date": new Date().toDateString()
        }
        
        acCopy["bench press"].push(newAchievement);
      }
    }

    // back squat achievements
    if (exerciseInputs["back squat"]) {
      // back squat input
      let bsInput = exerciseInputs["back squat"];
      // copy of back squat achievements (list)
      let bsAchievements = acCopy["back squat"];

      // One Star Squat
      if (bsInput >= 135 && !isUnlocked(bsAchievements, "One Star Squat")) {
        // create the One Star Squat achievement
        let newAchievement = {
          "name": "One Star Squat",
          "description": "Back Squat 1 Plate (135+ lbs.)",
          "date": new Date().toDateString()
        }
        // add it to the list of achievements
        acCopy["back squat"].push(newAchievement);
      }

      // Two Star Squat
      if (bsInput >= 225 && !isUnlocked(bsAchievements, "Two Star Squat")) {
        let newAchievement = {
          "name": "Two Star Squat",
          "description": "Back Squat 2 Plates (225+ lbs.)",
          "date": new Date().toDateString()
        }

        acCopy["back squat"].push(newAchievement);
      }
      
      // Three Star Squat
      if (bsInput >= 315 && !isUnlocked(bsAchievements, "Three Star Squat")) {
        let newAchievement = {
          "name": "Three Star Squat",
          "description": "Back Squat 3 Plates (315+ lbs.)",
          "date": new Date().toDateString()
        }

        acCopy["back squat"].push(newAchievement);
      }

      // Sasquat
      if (bsInput >= 405 && !isUnlocked(bsAchievements, "Sasquat")) {
        let newAchievement = {
          "name": "Sasquat",
          "description": "Back Squat 4 Plates (405+ lbs.)",
          "date": new Date().toDateString()
        }

        acCopy["back squat"].push(newAchievement);
      }
    }

    // deadlift achievements
    if (exerciseInputs["deadlift"]) {
      // deadlift input
      let dlInput = exerciseInputs["deadlift"];
      // copy of deadlift achievements
      let dlAchievements = acCopy["deadlift"];

      // One Star Deadlift
      if (dlInput >= 135 && !isUnlocked(dlAchievements, "One Star Deadlift")) {
        // create the One Star Deadlift achievement
        let newAchievement = {
          "name": "One Star Deadlift",
          "description": "Deadlift 1 Plate (135+ lbs.)",
          "date": new Date().toDateString()
        }
        // add it to the list of achievements
        acCopy["deadlift"].push(newAchievement);
      }

      // Two Star Deadlift
      if (dlInput >= 225 && !isUnlocked(dlAchievements, "Two Star Deadlift")) {
        let newAchievement = {
          "name": "Two Star Deadlift",
          "description": "Deadlift 2 Plates (225+ lbs.)",
          "date": new Date().toDateString()
        }
        
        acCopy["deadlift"].push(newAchievement);
      }

      // Three Star Deadlift
      if (dlInput >= 315 && !isUnlocked(dlAchievements, "Three Star Deadlift")) {
        let newAchievement = {
          "name": "Three Star Deadlift",
          "description": "Deadlift 3 Plates (315+ lbs.)",
          "date": new Date().toDateString()
        }
        
        acCopy["deadlift"].push(newAchievement);
      }

      // Deadly Lift
      if (dlInput >= 405 && !isUnlocked(dlAchievements, "Deadly Lift")) {
        let newAchievement = {
          "name": "Deadly Lift",
          "description": "Deadlift 4 Plates (405+ lbs.)",
          "date": new Date().toDateString()
        }
        
        acCopy["deadlift"].push(newAchievement);
      }

      // Deadlift Devil
      if (dlInput >= 495 && !isUnlocked(dlAchievements, "Deadlift Devil")) {
        let newAchievement = {
          "name": "Deadlift Devil",
          "description": "Deadlift 5 Plates (495+ lbs.)",
          "date": new Date().toDateString()
        }
        
        acCopy["deadlift"].push(newAchievement);
      }
    }

    // update achievements
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      await AsyncStorage.setItem('demoAchievements', JSON.stringify(acCopy));
    }
    else {
      await AsyncStorage.setItem('userAchievements', JSON.stringify(acCopy));
    }

    return "done";
  }

  // submit button - compare PBs and Achievements
  async function submitInput() {
    // first, update Personal Bests as needed
    await comparePBs();

    // check achievements
    await checkAchievements();

    // update "latest workout date"
    let today = new Date().toDateString();
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      await AsyncStorage.setItem('demoLastWorkoutDate', today);
    }
    else {
      await AsyncStorage.setItem('userLastWorkoutDate', today);
    }

    // go back to workout schedule screen
    navigation.navigate("Workout Schedule")
  }



  if (loading) {
    getWorkout();
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.bodyContainer}>
        <FlatList
          data={workout}
          renderItem={renderExerciseInputs}
          ListFooterComponent={
            <View style={styles.buttonContainer}>
              <Pressable onPress={submitInput}>
                <Text style={styles.buttonText}>Submit</Text>
              </Pressable>
            </View>
          }
        />
      </View>
    );
  }
}

// #225588
// #F4F5F5
// #E17000
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
    paddingBottom: 0,
    backgroundColor: "#C3DCF6"
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
    backgroundColor: "#FFFFFF"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  },
  labelText: {
    fontSize: 24,
    marginLeft: 8,
    marginRight: 16
  },
  buttonContainer: {
    flexDirection: "row-reverse"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    marginTop: 16,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#F58220",
    alignSelf: "flex-start"
  }
})
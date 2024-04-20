import { debugHeight, debugWeightHistory, debugWorkoutSchedule, debugMealPlan,
  debugPersonalBests, debugAchievements } from "../data/debugDataSets";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function initializeDebugVariables() {
  await AsyncStorage.setItem('debugHeight', JSON.stringify(debugHeight))
  await AsyncStorage.setItem('debugWeightHistory', JSON.stringify(debugWeightHistory))
  await AsyncStorage.setItem('debugWorkoutSchedule', JSON.stringify(debugWorkoutSchedule))
  await AsyncStorage.setItem('debugMealPlan', JSON.stringify(debugMealPlan))
  await AsyncStorage.setItem('debugPersonalBests', JSON.stringify(debugPersonalBests))
  await AsyncStorage.setItem('debugAchievements', JSON.stringify(debugAchievements))
}

export async function printDebugVariables() {
  let debugMode = await AsyncStorage.getItem('debugMode');
  let height = await AsyncStorage.getItem('debugHeight');
  let weightHistory = await AsyncStorage.getItem('debugWeightHistory');
  let workoutSchedule = await AsyncStorage.getItem('debugWorkoutSchedule');
  let mealPlan = await AsyncStorage.getItem('debugMealPlan');
  let personalBests = await AsyncStorage.getItem('debugPersonalBests');
  let achievements = await AsyncStorage.getItem('debugAchievements');

  console.log("debugMode: " + debugMode);
  console.log("height: " + height);
  console.log("weightHistory: " + weightHistory);
  console.log("workoutSchedule: " + workoutSchedule);
  console.log("mealPlan: " + mealPlan);
  console.log("personalBests: " + personalBests);
  console.log("achievements: " + achievements);
}

export async function updateHeight() {
  let height = JSON.parse(await AsyncStorage.getItem('debugHeight'));
  height["feet"] = 5;
  await AsyncStorage.setItem('debugHeight', JSON.stringify(height));
}

export async function printHeight() {
  let height = await AsyncStorage.getItem('debugHeight');
  console.log("height: " + height);
}
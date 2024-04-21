import { demoHeight, demoWeightHistory, demoWorkoutSchedule, demoPersonalBests,
  demoAchievements } from "../data/demoDataSets";
import { mpDefault } from "./mealPlanDataSets";

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function initializeDemoVariables() {
  await AsyncStorage.clear();
  await AsyncStorage.setItem('demoMode', "on")
  await AsyncStorage.setItem('demoHeight', JSON.stringify(demoHeight))
  await AsyncStorage.setItem('demoWeightHistory', JSON.stringify(demoWeightHistory))
  await AsyncStorage.setItem('demoLastWorkoutDate', demoWeightHistory[demoWeightHistory.length - 1]["date"])
  await AsyncStorage.setItem('demoWorkoutSchedule', JSON.stringify(demoWorkoutSchedule))
  await AsyncStorage.setItem('demoMealPlan', JSON.stringify(mpDefault))
  await AsyncStorage.setItem('demoPersonalBests', JSON.stringify(demoPersonalBests))
  await AsyncStorage.setItem('demoAchievements', JSON.stringify(demoAchievements))
  return "done";
}

export async function printDemoVariables() {
  let demoMode = await AsyncStorage.getItem('demoMode');
  let height = await AsyncStorage.getItem('demoHeight');
  let weightHistory = await AsyncStorage.getItem('demoWeightHistory');
  let lastWorkoutDate = await AsyncStorage.getItem('demoLastWorkoutDate');
  let workoutSchedule = await AsyncStorage.getItem('demoWorkoutSchedule');
  let mealPlan = await AsyncStorage.getItem('demoMealPlan');
  let personalBests = await AsyncStorage.getItem('demoPersonalBests');
  let achievements = await AsyncStorage.getItem('demoAchievements');

  console.log("demoMode: " + demoMode);
  console.log("height: " + height);
  console.log("weightHistory: " + weightHistory);
  console.log("lastWorkoutDate: " + lastWorkoutDate)
  console.log("workoutSchedule: " + workoutSchedule);
  console.log("mealPlan: " + mealPlan);
  console.log("personalBests: " + personalBests);
  console.log("achievements: " + achievements);
  return "done";
}
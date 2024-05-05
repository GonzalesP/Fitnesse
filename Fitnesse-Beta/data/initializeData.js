import { initialPersonalBests, initialAchievements } from "./initialDataSets";
import { demoHeight, demoWeightHistory, demoPersonalBests, demoAchievements }
  from "./demoDataSets";
import { mpGeneralHealth } from "./mealPlanDataSets";
import { wsBalanced } from "./workoutScheduleDataSets";

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function initializeData() {
  let dataInitialized = await AsyncStorage.getItem('dataInitialized');

  if (dataInitialized == null) {
    await AsyncStorage.setItem('userWorkoutSchedule', JSON.stringify(wsBalanced));
    await AsyncStorage.setItem('userMealPlan', JSON.stringify(mpGeneralHealth))
    await AsyncStorage.setItem('userPersonalBests', JSON.stringify(initialPersonalBests));
    await AsyncStorage.setItem('userAchievements', JSON.stringify(initialAchievements));
    await AsyncStorage.setItem('userFitnessGoal', "balanced");

    await AsyncStorage.setItem('demoMode', "off");
    await AsyncStorage.setItem('demoHeight', JSON.stringify(demoHeight));
    await AsyncStorage.setItem('demoWeightHistory', JSON.stringify(demoWeightHistory));
    await AsyncStorage.setItem('demoWorkoutSchedule', JSON.stringify(wsBalanced));
    await AsyncStorage.setItem('demoMealPlan', JSON.stringify(mpGeneralHealth));
    await AsyncStorage.setItem('demoPersonalBests', JSON.stringify(demoPersonalBests));
    await AsyncStorage.setItem('demoAchievements', JSON.stringify(demoAchievements));
    await AsyncStorage.setItem('demoFitnessGoal', "balanced");
    // await AsyncStorage.setItem('demoLastWorkoutDate', demoWeightHistory[demoWeightHistory.length - 1]["date"])

    await AsyncStorage.setItem('dataInitialized', "true");
  }

  return "done";
}
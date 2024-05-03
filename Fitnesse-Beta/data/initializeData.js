import { initialPersonalBests, initialAchievements } from "./initialDataSets";
import { demoHeight, demoWeightHistory, demoPersonalBests, demoAchievements }
  from "./demoDataSets";
import { mpDefault } from "./mealPlanDataSets";
import { wsDefault } from "./workoutScheduleDataSets";

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function initializeData() {
  let dataInitialized = await AsyncStorage.getItem('dataInitialized');

  if (dataInitialized == null) {
    await AsyncStorage.setItem('userWorkoutSchedule', JSON.stringify(wsDefault));
    await AsyncStorage.setItem('userMealPlan', JSON.stringify(mpDefault))
    await AsyncStorage.setItem('userPersonalBests', JSON.stringify(initialPersonalBests));
    await AsyncStorage.setItem('userAchievements', JSON.stringify(initialAchievements));
    await AsyncStorage.setItem('userFitnessGoal', "default");

    await AsyncStorage.setItem('demoMode', "off");
    await AsyncStorage.setItem('demoHeight', JSON.stringify(demoHeight));
    await AsyncStorage.setItem('demoWeightHistory', JSON.stringify(demoWeightHistory));
    await AsyncStorage.setItem('demoWorkoutSchedule', JSON.stringify(wsDefault));
    await AsyncStorage.setItem('demoMealPlan', JSON.stringify(mpDefault));
    await AsyncStorage.setItem('demoPersonalBests', JSON.stringify(demoPersonalBests));
    await AsyncStorage.setItem('demoAchievements', JSON.stringify(demoAchievements));
    await AsyncStorage.setItem('demoFitnessGoal', "default");
    // await AsyncStorage.setItem('demoLastWorkoutDate', demoWeightHistory[demoWeightHistory.length - 1]["date"])

    await AsyncStorage.setItem('dataInitialized', "true");
  }

  return "done";
}
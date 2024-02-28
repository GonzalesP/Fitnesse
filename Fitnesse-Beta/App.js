import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import WorkoutScheduleScreen from "./screens/WorkoutScheduleScreen";
import MealPlanScreen from "./screens/MealPlanScreen";
import AchievementsScreen from "./screens/AchievementsScreen";
import SettingsScreen from "./screens/SettingsScreen";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          tabBarActiveTintColor: "orange",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <Ionicons name={"home"} size={20} />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Workout Schedule"
          component={WorkoutScheduleScreen}
          options={{
            tabBarLabel: "Workouts",
            tabBarIcon: () => <FontAwesome6 name={"dumbbell"} size={20} />,
          }}
        />
        <Tab.Screen
          name="Meal Plan"
          component={MealPlanScreen}
          options={{
            tabBarLabel: "Meal Plan",
            tabBarIcon: () => <MaterialIcons name={"set-meal"} size={20} />,
          }}
        />
        <Tab.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{
            tabBarLabel: "Achievements",
            tabBarIcon: () => <Ionicons name={"trophy"} size={20} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: () => <Ionicons name={"settings-sharp"} size={20} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
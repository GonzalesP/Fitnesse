import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";

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
      <StatusBar
        backgroundColor="#00274C"
        barStyle="light-content"
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          tabBarActiveTintColor: "#719dcd",
          tabBarInactiveTintColor: "#F4F5F5",
          tabBarStyle: { backgroundColor: "#00274C" },
          headerStyle: { backgroundColor: "#00274C" },
          headerTitleStyle: { color: "#F4F5F5"},
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <Ionicons name={"home"} size={20} color={color}/>,
            // headerShown: false,
          }}
        />
        <Tab.Screen
          name="Workout Schedule"
          component={WorkoutScheduleScreen}
          options={{
            tabBarLabel: "Workouts",
            tabBarIcon: ({ color }) => <FontAwesome6 name={"dumbbell"} size={20} color={color} />,
          }}
        />
        <Tab.Screen
          name="Meal Plan"
          component={MealPlanScreen}
          options={{
            tabBarLabel: "Meals",
            tabBarIcon: ({ color }) => <MaterialIcons name={"set-meal"} size={20} color={color} />,
          }}
        />
        <Tab.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{
            tabBarLabel: "Achievements",
            tabBarIcon: ({ color }) => <Ionicons name={"trophy"} size={20} color={color} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => <Ionicons name={"settings-sharp"} size={20} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
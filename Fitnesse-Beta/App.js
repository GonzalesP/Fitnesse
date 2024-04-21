import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import { WorkoutStack } from "./stacks/WorkoutStack";
import { MealStack } from "./stacks/MealStack";
import { StatisticsStack } from "./stacks/StatisticsStack";
import { ProfileStack } from "./stacks/ProfileStack";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        // backgroundColor="#FFFFFF"
        barStyle="light-content"
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          // tabBarActiveTintColor: "#719dcd",
          // tabBarInactiveTintColor: "#F4F5F5",
          // tabBarStyle: { backgroundColor: "#00274C" },
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
          name="Workout Stack"
          component={WorkoutStack}
          options={{
            tabBarLabel: "Workouts",
            tabBarIcon: ({ color }) => <FontAwesome6 name={"dumbbell"} size={20} color={color} />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Meal Stack"
          component={MealStack}
          options={{
            tabBarLabel: "Meals",
            tabBarIcon: ({ color }) => <MaterialIcons name={"set-meal"} size={20} color={color} />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Statistics Stack"
          component={StatisticsStack}
          options={{
            tabBarLabel: "Statistics",
            tabBarIcon: ({ color }) => <Octicons name={"graph"} size={20} color={color} />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile Stack"
          component={ProfileStack}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <FontAwesome6 name={"user-large"} size={20} color={color} />,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AchievementsScreen from "../screens/AchievementsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const Stack = createNativeStackNavigator();

export const StatisticsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: "#00274C" },
        // headerTitleStyle: { color: "#F4F5F5" },
        // headerTintColor: "#F4F5F5",
      }}
    >
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: "Statistics",
        }}
      />
      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          title: "Achievements",
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatisticsStack />
    </NavigationContainer>
  );
}
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealPlanScreen from "../screens/MealPlanScreen";

const Stack = createNativeStackNavigator();

export const MealStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1E5793" },
        headerTitleStyle: { color: "#F4F5F5" },
        headerTintColor: "#F4F5F5",
      }}
    >
      <Stack.Screen
        name="Meal Plan"
        component={MealPlanScreen}
        options={{
          title: "Meal Plan",
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MealStack />
    </NavigationContainer>
  );
}
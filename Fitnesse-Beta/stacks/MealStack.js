import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealPlanScreen from "../screens/MealPlanScreen";
import EditMealPlanScreen from "../screens/EditMealPlanScreen";

const Stack = createNativeStackNavigator();

export const MealStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: "#00274C" },
        // headerTitleStyle: { color: "#F4F5F5" },
        // headerTintColor: "#F4F5F5",
      }}
    >
      <Stack.Screen
        name="Meal Plan"
        component={MealPlanScreen}
        options={{
          title: "Meal Plan",
        }}
      />
      <Stack.Screen
        name="Edit Meal Plan"
        component={EditMealPlanScreen}
        options={{
          title: "Edit Meal Plan",
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
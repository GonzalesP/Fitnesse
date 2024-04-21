import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutScheduleScreen from "../screens/WorkoutScheduleScreen";
import EditWorkoutScheduleScreen from "../screens/EditWorkoutScheduleScreen";

const Stack = createNativeStackNavigator();

export const WorkoutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: "#00274C" },
        // headerTitleStyle: { color: "#F4F5F5" },
        // headerTintColor: "#F4F5F5",
      }}
    >
      <Stack.Screen
        name="Workout Schedule"
        component={WorkoutScheduleScreen}
        options={{
          title: "Workout Schedule",
        }}
      />
      <Stack.Screen
        name="Edit Workout Schedule"
        component={EditWorkoutScheduleScreen}
        options={{
          title: "Edit Workout Schedule",
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <WorkoutStack />
    </NavigationContainer>
  );
}
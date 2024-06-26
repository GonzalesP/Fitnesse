import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutScheduleScreen from "../screens/WorkoutScheduleScreen";
import RecordWorkoutScreen from "../screens/RecordWorkoutScreen";

const Stack = createNativeStackNavigator();

export const WorkoutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1E5793" },
        headerTitleStyle: { color: "#F4F5F5" },
        headerTintColor: "#F4F5F5",
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
        name="Record Workout"
        component={RecordWorkoutScreen}
        options={{
          title: "Record Today's Workout",
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
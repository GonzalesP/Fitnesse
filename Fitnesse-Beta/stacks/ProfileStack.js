import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateWeightHeightScreen from "../screens/UpdateWeightHeightScreen";
import RecordWeightScreen from "../screens/RecordWeightScreen";

const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: "#00274C" },
        // headerTitleStyle: { color: "#F4F5F5" },
        // headerTintColor: "#F4F5F5",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="Update Weight and Height"
        component={UpdateWeightHeightScreen}
        options={{
          title: "Update Weight and Height",
        }}
      />
      <Stack.Screen
        name="Record Weight"
        component={RecordWeightScreen}
        options={{
          title: "Record Today's Weight",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <ProfileStack />
    </NavigationContainer>
  )
}
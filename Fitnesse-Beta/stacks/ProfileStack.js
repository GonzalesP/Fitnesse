import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateHeightWeightScreen from "../screens/UpdateHeightWeightScreen";
import RecordWeightScreen from "../screens/RecordWeightScreen";
import UpdateDietScreen from "../screens/UpdateDietScreen"

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
        name="Update Height Weight"
        component={UpdateHeightWeightScreen}
        options={{
          title: "Update Height and Weight",
        }}
      />
      <Stack.Screen
        name="Record Weight"
        component={RecordWeightScreen}
        options={{
          title: "Record Today's Weight",
        }}
      />
      <Stack.Screen
        name="Update Diet"
        component={UpdateDietScreen}
        options={{
          title: "Choose Your Diet",
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
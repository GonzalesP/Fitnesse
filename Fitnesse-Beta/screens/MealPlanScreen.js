import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MealPlanScreen({ navigation }) {
  const currentDay = new Date().getDay();
  const [day, setDay] = useState(currentDay);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [dayName, setDayName] = useState(dayNames[currentDay]);

  const [mealPlan, setMealPlan] = useState();
  const [loading, setLoading] = useState(true);

  const refreshScreen = navigation.addListener('focus', async() => {
    setLoading(true);
  });

  async function getMealPlan() {
    // fetch data from AsyncStorage
    let debugMode = await AsyncStorage.getItem('debugMode');
    if (debugMode == "on") {
      let mp = JSON.parse(await AsyncStorage.getItem('debugMealPlan'));
      setMealPlan(mp);
    }
    else {
      // getItem userMealPlan
    }
    // remove loading screen
    setLoading(false);
  }

  function updateDay(index) {
    setDay(index)
    setDayName(dayNames[index]);
  }

  function stringifyIngredients(ingredients) {
    if (ingredients.length == 0) {
      return "No ingredients listed."
    }

    let ingredientsList = "";
    for (let index = 0; index < ingredients.length - 1; index++) {
      ingredientsList += ingredients[index] + ", "
    }
    ingredientsList += ingredients[ingredients.length - 1];
    return ingredientsList;
  }

  function renderMeals({ item }) {
    return (
      <View>
        <Text>{item.mealType}</Text>
        <Text>{item.mealName}</Text>
        <Text>Ingredients: {stringifyIngredients(item.ingredients)}</Text>
      </View>
    );
  }



  if (loading) {
    getMealPlan();
    return (
      <View>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  } else {
    return (
      <View style={styles.bodyContainer}>
        {/* Select Day of the Week */}
        <View style={styles.daysContainer}>
          <Pressable onPress={updateDay.bind(this, 0)}>
            <Text>S</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 1)}>
            <Text>M</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 2)}>
            <Text>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 3)}>
            <Text>W</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 4)}>
            <Text>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 5)}>
            <Text>F</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 6)}>
            <Text>S</Text>
          </Pressable>
        </View>
        {/* diet type */}
        <View>
          <Text>Diet: {mealPlan.dietType}</Text>
        </View>
        {/* day of the week */}
        <View>
          <Text>{dayName}</Text>
        </View>
        {/* display meals */}
        <FlatList
          data={mealPlan["meals"][day]}
          renderItem={renderMeals}
        />
      </View>
    );
  }
};

// #225588
// #F4F5F5
// #E17000
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  }
})
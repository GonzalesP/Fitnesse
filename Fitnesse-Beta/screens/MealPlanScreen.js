import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState } from "react";
import mealPlan from '../data/default-meal-plan.json';

export default function MealPlanScreen({ navigation }) {
  const currentDay = new Date().getDay();
  const [day, setDay] = useState(currentDay);
  const [meals, setMeals] = useState(mealPlan[day]);

  function updateMealsView(newDay) {
    setDay(newDay);
    setMeals(mealPlan[newDay]);
  }

  function renderMeals({ item }) {
    return (
      <View key={item.id}>
        <Text style={styles.mealsText}>{item.mealType}</Text>
        <Text style={styles.mealsText}>{item.mealName}</Text>
        <Text style={styles.mealsText}>{stringifyIngredients(item.ingredients)}</Text>
      </View>
    );
  }

  function stringifyIngredients(ingredients) {
    let ingredientsList = "";
    for (let index = 0; index < ingredients.length - 1; index++) {
      ingredientsList += ingredients[index] + ", "
    }
    ingredientsList += ingredients[ingredients.length - 1];
    return ingredientsList;
  }

  return (
    <View style={styles.container}>
      {/* <Pressable onPress={() => navigation.navigate("Edit Meal Plan")}>
        <Text style={styles.testText}>Go to 'Edit Meal Plan' screen</Text>
      </Pressable> */}
      
      <View style={styles.daysContainer}>
        <Pressable onPress={updateMealsView.bind(this, 0)}>
          <Text style={styles.text}>S</Text>
        </Pressable>
      
        <Pressable onPress={updateMealsView.bind(this, 1)}>
          <Text style={styles.text}>M</Text>
        </Pressable>
      
        <Pressable onPress={updateMealsView.bind(this, 2)}>
          <Text style={styles.text}>T</Text>
        </Pressable>
      
        <Pressable onPress={updateMealsView.bind(this, 3)}>
          <Text style={styles.text}>W</Text>
        </Pressable>
      
        <Pressable onPress={updateMealsView.bind(this, 4)}>
          <Text style={styles.text}>T</Text>
        </Pressable>
      
        <Pressable onPress={updateMealsView.bind(this, 5)}>
          <Text style={styles.text}>F</Text>
        </Pressable>
      
        <Pressable onPress={updateMealsView.bind(this, 6)}>
          <Text style={styles.text}>S</Text>
        </Pressable>
      </View>

      <View style={styles.mealsContainer}>
        <View style={styles.mealsHeader}>
          <Text style={styles.text}>{meals.day}</Text>
        </View>
        
        <FlatList
          data={meals.meals}
          renderItem={renderMeals}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // backgroundColor: "#225588",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    // color: "#F4F5F5",
  },
  testText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    // color: "#E17000",
    padding: 16,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  mealsContainer: {
    flex: 1,
    padding: 16,
  },
  mealsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mealsText: {
    fontSize: 16,
  },
})
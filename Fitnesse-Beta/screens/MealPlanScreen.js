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
    let mp;
    let demoMode = await AsyncStorage.getItem('demoMode');
    if (demoMode == "on") {
      mp = JSON.parse(await AsyncStorage.getItem('demoMealPlan'));
      setMealPlan(mp);
    }
    else {
      mp = JSON.parse(await AsyncStorage.getItem('userMealPlan'));
      setMealPlan(mp);
    }
    // remove loading screen
    setLoading(false);
  }

  function updateDay(index) {
    setDay(index)
    setDayName(dayNames[index]);
  }

  function renderMeals({ item }) {
    let container;
    if (item.mealType == "Breakfast") {
      container = styles.breakfastContainer;
    }
    else if (item.mealType == "A.M. Snack") {
      container = styles.amSnackContainer;
    }
    else if (item.mealType == "Lunch") {
      container = styles.lunchContainer;
    }
    else if (item.mealType == "P.M. Snack") {
      container = styles.pmSnackContainer;
    }
    else if (item.mealType == "Dinner") {
      container = styles.dinnerContainer;
    }

    return (
      <View key={item.mealType} style={container}>
        <Text style={styles.mealTypeText}>{item.mealType}</Text>
        <Text style={styles.mealNameText}>{item.mealName}</Text>
        {/* <Text>Ingredients: {stringifyIngredients(item.ingredients)}</Text> */}
      </View>
    );
  }



  if (loading) {
    getMealPlan();
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.bodyContainer}>
        {/* Select Day of the Week */}
        <View style={styles.daysContainer}>
          <Pressable onPress={updateDay.bind(this, 0)}>
            <Text style={
              day == 0 ? styles.activeDayButton : styles.inactiveDayButton
              }>S</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 1)}>
            <Text style={
              day == 1 ? styles.activeDayButton : styles.inactiveDayButton
              }>M</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 2)}>
            <Text style={
              day == 2 ? styles.activeDayButton : styles.inactiveDayButton
              }>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 3)}>
            <Text style={
              day == 3 ? styles.activeDayButton : styles.inactiveDayButton
              }>W</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 4)}>
            <Text style={
              day == 4 ? styles.activeDayButton : styles.inactiveDayButton
              }>T</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 5)}>
            <Text style={
              day == 5 ? styles.activeDayButton : styles.inactiveDayButton
              }>F</Text>
          </Pressable>
          <Pressable onPress={updateDay.bind(this, 6)}>
            <Text style={
              day == 6 ? styles.activeDayButton : styles.inactiveDayButton
              }>S</Text>
          </Pressable>
        </View>
        {/* day of the week */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{dayName}</Text>
        </View>
        {/* display meals */}
        <FlatList
          data={mealPlan["meals"][day]}
          renderItem={renderMeals}
          ItemSeparatorComponent={<View style={{ height: 16 }}></View>}
          ListHeaderComponent={<View style={{ height: 16 }}></View>}
          ListFooterComponent={<View style={{ height: 16 }}></View>}
        />
      </View>
    );
  }
};

// #225588
// #F4F5F5
// #E17000
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C3DCF6"
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#C3DCF6"
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24
  },
  activeDayButton: {
    fontSize: 24,
    height: 36,
    width: 36,
    backgroundColor: "#F58220",
    borderWidth: 2,
    borderRadius: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 4
  },
  inactiveDayButton: {
    fontSize: 24,
    height: 36,
    width: 36,
    borderWidth: 2,
    borderRadius: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: "#9DBED8",
    padding: 4
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  breakfastContainer: {
    backgroundColor: "lightskyblue",
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
  },
  amSnackContainer: {
    backgroundColor: "lightgreen",
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
  },
  lunchContainer: {
    backgroundColor: "khaki",
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
  },
  pmSnackContainer: {
    backgroundColor: "lightsalmon",
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
  },
  dinnerContainer: {
    backgroundColor: "lightcoral",
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
  },
  mealTypeText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  mealNameText: {
    fontSize: 18,
  }
})
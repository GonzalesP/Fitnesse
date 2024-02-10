import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [people, setPeople] = useState([
    { name: 'shaun', id: '1', },
    { name: 'yoshi', id: '2', },
    { name: 'mario', id: '3', },
    { name: 'luigi', id: '4', },
    { name: 'peach', id: '5', },
    { name: 'toad', id: '6', },
    { name: 'bowser', id: '7', },
  ]);

  const pressHandler = (id) => {
    console.log(id);
    // safer to pass a function into the state changing function
    // - take current state (prevPeople) and update it, which will be returned implicitly
    // - use filter function to filter out array: pass arrow function to access items (person) and create a filter (!= id)
    // "for each item in array (person), filter's arrow function will apply -> converts array into list of booleans"
    // finally, filter will return all TRUE items
    setPeople((prevPeople) => {
      return prevPeople.filter(person => person.id != id);
    });
  }

  // onPress can only be added to Button and a few other components. and buttons can't have a style prop
  // so, to make text "pressable", you use a touchable component
  // TouchableOpacity: touching something kind of makes it go opaque (makes user feel like they touched it)
  // to make something touchable, you wrap it with the TouchableOpacity component
  // THEN, you can add an onPress prop (as well as a style prop)

  return (
    <View style={styles.container}>

      <FlatList
        keyExtractor={(item) => item.id}
        data={people}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => pressHandler(item.id)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
    marginHorizontal: 10,
    marginTop: 24,
  },
});

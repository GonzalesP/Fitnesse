import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  const [people, setPeople] = useState([
    { name: 'shaun', key: '1', },
    { name: 'yoshi', key: '2', },
    { name: 'mario', key: '3', },
    { name: 'luigi', key: '4', },
    { name: 'peach', key: '5', },
    { name: 'toad', key: '6', },
    { name: 'bowser', key: '7', },
  ]);

  // key property is needed because when you output lists in RN, it needs to keep track of different elements it outputs
  // map function: cycles through an array and performs a function on each item in the array, and can return a value for each item
  // function inside map() will be performed on each item inside the array (people)

  // to add JS code, use curly braces.
  // arrow functions with only one parameter don't need ()
  // each item in array is represented by the 'item' parameter
  // don't need return in arrow function, can implicitly return with ()
// all parent tags (View) needs a key prop

  return (
    <View style={styles.container}>

    <ScrollView>
      { people.map(item => (  // return JSX template
          <View key={item.key}>
            <Text style={styles.item}>{item.name}</Text>
          </View>
      ))}
    </ScrollView>

    </View>
  );
}

// note: View's display by itself can go on forever
// if you want a user to be able to scroll through a component, it has to be wrapped in a ScrollView
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
  },
});

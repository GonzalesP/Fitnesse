import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [name, setName] = useState('shaun');
  const [age, setAge] = useState('30');

  // TextInput is a self closing tag. Also, it is invisible by default, so you need style.
  // multiline: allows a multiline input (i.e. pressing Enter goes to new line)
  // placeholder is an example value
  // onChangeText calls an external/internal function (ex. setAge is called to update the age variable)
  // keyboardType changes the type of keyboard
  // for more attributes, check out the React Native API.
  return (
    <View style={styles.container}>
      <Text>Enter name:</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder='e.g. John Doe'
        onChangeText={(val) => setName(val)} />

      <Text>Enter age:</Text>
      <TextInput
        keyboardType='numeric'
        style={styles.input}
        placeholder='e.g. 99'
        onChangeText={(val) => setAge(val)} />

      <Text>name: {name}, age: {age}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [name, setName] = useState('shaun');
  // useState: returns stateful value and function to cchange it (from react)
  // name: stateful value
  // setName: function used to change it
  // general convention: x, setX = useState();

  const [person, setPerson] = useState({ name: 'mario', age: 40 });
  // can pass any type of variable

  const clickHandler = () => {
    setName('chun-li');
    setPerson({ name: 'luigi', age: 45 });
  }

  return (  // similar to HTML: wrap components
    <View style={styles.container}>
      <Text>My name is {name}</Text>
      <Text>His name is {person.name} and his age is {person.age}</Text>
      <View style={styles.buttonContainer}>
        <Button title='update state' onPress={clickHandler}/>
      </View>
    </View>
  );
}

// Hooks use special functions to tap into certain features of the RN library

// <Button />: no opening and closing tag! pass props to specify the text on the button!

// you can't add style properties a <Button> (which is why it's in a View)
// You'll have to make a custom button instead

// title: text inside the button
// onPress: the action when pressed



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

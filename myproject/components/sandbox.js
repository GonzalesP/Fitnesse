import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Sandbox() {
  return (
    // since View is a flex container, everything inside has flex automatically
    <View style={styles.container}>
      <Text style={styles.boxOne}>one</Text>
      <Text style={styles.boxTwo}>two</Text>
      <Text style={styles.boxThree}>three</Text>
      <Text style={styles.boxFour}>four</Text>
    </View>
  )
}

// flex 1: stretch to the bottom, flexDirection: which direction do they stack?
// main axis: flexDirection; cross axis: the opposite direction
const styles = StyleSheet.create({
  container: {
    // flex: 1,  // become a flexible component that goes all the way to the bottom (take all the available room)
    flexDirection: 'row',  // make items stack side by side (left to right)
    justifyContent: 'space-around',  // spread things around on the MAIN axis
    alignItems: 'flex-end', // spread things around on the CROSS axis - SAME ROW
    paddingTop: 40,
    backgroundColor: '#ddd',
  },
  boxOne: {
    flex: 1,  // take up all available space (ex. in between each other) - grow at same rate
    backgroundColor: 'violet',  // "splitting up the space into 5 pieces"
    padding: 10,
  },
  boxTwo: {
    flex: 2,
    backgroundColor: 'gold',
    padding: 20,
  },
  boxThree: {
    flex: 1,
    backgroundColor: 'coral',
    padding: 30,
  },
  boxFour: {
    flex: 3,
    backgroundColor: 'skyblue',
    padding: 40,
  },
});
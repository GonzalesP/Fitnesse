import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState('');

  // same as onChangeText={(val) => changeHandler(val)}
  const changeHandler = (val) => {
    setText(val);  // make text = val (which is inside TextInput)
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder='new todo...'
        onChangeText={changeHandler}
      />
      <Button onPress={() => submitHandler(text)} title='add todo' color='coral' />
      {/* once the button is pressed, submitHandler from App.js will be called to add
          the new todo item to the array todos (change its state) */}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  }
})
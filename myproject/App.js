import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

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

  // CTRL + / turns code into a comment
  // data prop specifies the data that we want to output
  // renderItem is = to a function that returns JSX
  // need to destructure items in people for renderItem
  // FlatList automatically looks at DATA for a key property. So, you don't need to explicitly set a key property in the RN tag
  // FlatList has same behavior as ScrollView, but better performance and less code
  // when first rendering a LARGE list, not all items will be loaded until you scroll down the list (unlike ScrollView)
  // if the key attribute is not called 'key' (ex. 'id' instead in databases), use the keyExtractor prop
  // ex. keyExtractor={(item) => item.id} - don't look for key property, look for 'id' prop and use it as a key instead
  // note: changing numColumns on the fly is not supported, so avoid using it?

  return (
    <View style={styles.container}>

      <FlatList
        keyExtractor={(item) => item.id}
        data={people}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
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

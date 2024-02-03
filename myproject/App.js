import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (  // similar to HTML: wrap components
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boldText}>Hello, World!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.boldText}>Lorem ipsum <Text>test</Text> dolor sit amet.</Text>
        <Text>Lorem ipsum dolor sit amet.</Text>
        <Text>Lorem ipsum dolor sit amet.</Text>
      </View>
    </View>
  );
}
// <Text>: used to include text components (text strings must be wrapped in
// <Text>, otherwise there will be an error)

// <StatusBar style="auto" /> makes the notification bar transparent

// control how different components look in the screen
// styles EMULATES CSS (because iOS and Android don't support CSS)

// STYLES ARE NOT AUTOMATICALLY INHERETED!! (i.e. View style != Text style)
// exception: Text widgets within text widgets (child text inherits)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  // don't use - like CSS, use camel case for RN
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  body: {  // STYLES ARE NOT AUTOMATICALLY INHERETED!!
    backgroundColor: 'yellow',
    padding: 20,  // size in px
    // fontWeight: 'bold',
  },
});

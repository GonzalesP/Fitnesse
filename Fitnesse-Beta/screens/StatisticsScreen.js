import { View, Text, StyleSheet } from "react-native";

export default function StatisticsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statistics</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#225588",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    // color: "#F4F5F5",
    padding: 16,
  },
})
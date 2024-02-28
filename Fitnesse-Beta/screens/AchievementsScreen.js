import { View, Text, StyleSheet } from "react-native";

const AchievementsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Achievements</Text>
    </View>
  );
}

export default AchievementsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  }
})
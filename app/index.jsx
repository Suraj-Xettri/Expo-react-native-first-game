import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={{
        fontSize:20
      }}>Sora.</Text>
      <StatusBar style="auto" />
      <Link href="./Components/Game" style={{color:'blue', fontSize:30}}>Play Game</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

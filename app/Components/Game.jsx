import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Game = () => {
  const target = 10 + Math.floor(40 * Math.random());
  const arr = [1, 2, 3, 4, 5, 6,7,8,9];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Target: {target}</Text>
      </View>
      <View style={styles.gridContainer}>
        {arr.map((num, i) => (
          <View key={i} style={styles.gridItem}>
            <Text style={styles.gridText}>{num}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f5",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  gridContainer: {
    marginTop:150,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
  },
  gridItem: {
    width: 90,
    height: 90,
    backgroundColor: "#ffcad4",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  gridText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
});

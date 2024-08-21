import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RandomNumber from "./RandomNumber";
const Game = () => {
  const totalChoice = 6;

  const randomNumbers = Array.from({ length: totalChoice}).map(() => 
    2 + Math.floor(20 * Math.random())
  );

  const target = randomNumbers.slice(0, totalChoice -2).
  reduce((acc, curr) => acc + curr,0);



  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Target: {target}</Text>
      </View>
      <View style={styles.gridContainer}>
        {randomNumbers.map((num, i) => (
          <RandomNumber key={i} number={num} target={target}/>
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
    marginTop: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
  },
  
});

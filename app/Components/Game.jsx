import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import RandomNumber from "./RandomNumber";

const Game = () => {
  const totalChoice = 6;

  // Generate the random numbers and target only once when the component mounts
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [target, setTarget] = useState(0);

  useEffect(() => {
    // Generate random numbers once when the component mounts
    const generatedNumbers = Array.from({ length: totalChoice }).map(
      () => 2 + Math.floor(20 * Math.random())
    );

    // Calculate the target based on the generated numbers
    const calculatedTarget = generatedNumbers
      .slice(0, totalChoice - 2)
      .reduce((acc, curr) => acc + curr, 0);

    setRandomNumbers(generatedNumbers);
    setTarget(calculatedTarget);
  }, []); // Empty dependency array ensures this runs only once

  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const [time, setTime] = useState(10);

  useEffect(() => {
    // Timer setup using useEffect
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const isNumberSelected = (index) => selectedNumbers.includes(index);

  const handleNumberPress = (index) => {
    setSelectedNumbers((prevSelected) => [...prevSelected, index]);
  };

  const gameStatus = () => {
    const sumSelected = selectedNumbers.reduce((acc, curr) => {
      return acc + randomNumbers[curr];
    }, 0);

    if (time === 0){
      return "LOST"
    }
    if (sumSelected < target) {
      return "PLAYING";
    }

    if (sumSelected === target) {
      return "WON";
    }

    if (sumSelected > target) {
      return "LOST";
    }
  };

  const GameStatus = gameStatus();

  return (
    <View style={styles.container}>
      <View style={[styles.statusContainer, styles[`STATUS_${GameStatus}`]]}>
        <Text style={styles.header}>Target: {target}</Text>
        <Text>Remaining Time: {time} </Text>
      </View>
      <View style={styles.gridContainer}>
        {randomNumbers.map((num, i) => (
          <RandomNumber
            key={i}
            id={i}
            number={num}
            isDisabled={isNumberSelected(i) || GameStatus !== "PLAYING"}
            target={target}
            onpress={handleNumberPress}
          />
        ))}
      </View>

      <Text style={styles.results}>{GameStatus}</Text>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statusContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 25,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  gridContainer: {
    marginTop: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
  },
  results: {
    marginTop: 150,
    fontSize: 40,
    fontWeight: "600",
    textDecorationLine: "underline",
    padding: 10,
  },
  STATUS_PLAYING: {
    backgroundColor: "#bbb",
  },
  STATUS_WON: {
    backgroundColor: "green",
  },
  STATUS_LOST: {
    backgroundColor: "red",
  },
});

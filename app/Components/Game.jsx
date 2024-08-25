import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import RandomNumber from "./RandomNumber";

const Game = () => {
  const totalChoice = 6;
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [target, setTarget] = useState(0);
  const [Won, setWon] = useState(0);
  const [Lost, setLost] = useState(0);
  const [time, setTime] = useState(10);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const playAgain = () => {
    // Generate new numbers and target just like when the component mounts
    const generatedNumbers = Array.from({ length: totalChoice }).map(
      () => 2 + Math.floor(20 * Math.random())
    );

    const calculatedTarget = generatedNumbers
      .slice(0, totalChoice - 2)
      .reduce((acc, curr) => acc + curr, 0);

    setRandomNumbers(generatedNumbers);
    setTarget(calculatedTarget);
    setTime(10); // Reset the timer to 10 seconds
    setSelectedNumbers([]);
  };

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

  const ResetResult = () => {
    setLost(0);
    setWon(0);
  };

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
    }, 10000);

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

    if (time === 0) {
      return "LOST";
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

  useEffect(() => {
    const calculateResult = () => {
      if (GameStatus === "WON") {
        setWon((prev) => prev + 1);
      }

      if (GameStatus === "LOST") {
        setLost((prev) => prev + 1);
      }
    };

    calculateResult();
  }, [selectedNumbers, time, target]); // Track the states that affect GameStatus

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.status}>
          <Text style={styles.statusText}>Won: {Won}</Text>
          <Text style={styles.statusText}>Lost: {Lost}</Text>

          <TouchableOpacity style={styles.reset} onPress={ResetResult}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.statusContainer, styles[`STATUS_${GameStatus}`]]}>
          <Text style={styles.header}>Target: {target}</Text>
          <Text>Remaining Time: {time} </Text>
        </View>
      </View>

      <View style={styles.lastContainer}>
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

        <View style={styles.last}>
          <Text style={styles.results}>{GameStatus}</Text>
          {GameStatus === "WON" ||
            (GameStatus === "LOST" && (
              <TouchableOpacity style={styles.resetLast} onPress={playAgain}>
                <Text>Play Again</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
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
  topContainer: {
    marginTop: 20,
  },
  lastContainer: {
    marginBottom: 20,
    gap: 10,
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
    marginTop: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
  },
  results: {
    fontSize: 40,
    fontWeight: "600",
    textDecorationLine: "underline",
    padding: 10,
  },
  STATUS_PLAYING: {
    backgroundColor: "#bbb",
    borderRadius: 15,
  },
  STATUS_WON: {
    backgroundColor: "green",
    borderRadius: 15,
  },
  STATUS_LOST: {
    backgroundColor: "red",
    borderRadius: 15,
  },
  status: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  statusText: {
    fontSize: 20,
  },
  reset: {
    backgroundColor: "pink",
    opacity: 0.8,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  resetText: {
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "italic",
    textAlign: "center",
  },
  last: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resetLast: {
    backgroundColor: "skyblue",
    marginTop: 30,
    opacity: 0.5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

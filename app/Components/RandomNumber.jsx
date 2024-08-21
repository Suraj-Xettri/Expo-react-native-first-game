import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

const RandomNumber = ({ number, target }) => {
  const [selectedNumber, setSelectedNumber] = useState([]);

  const handlePress = () => {
    setSelectedNumber((prev) => {
      // Return a new array with the previous numbers plus the new one
      return [...prev, number];
    });
  };

  console.log(selectedNumber);
  return (
    <View style={styles.gridItem}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.gridText}>{number}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RandomNumber;

const styles = StyleSheet.create({
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

import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const RandomNumber = ({ number,id,  onpress, isDisabled}) => {

  const handlePress = (id) => {
    if(isDisabled) return;
    onpress(id)
  };

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity style={styles.butt} onPress={() => handlePress(id)}>
        <Text style={[styles.gridText, isDisabled && styles.selected]}>{number}</Text>
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
  butt:{
    width:'full',
    height:'full'
  },
  gridText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  selected:{
    opacity: 0.3
  }
});

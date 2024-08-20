import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Game = () => {
    target = 10 + Math.floor(40 * Math.random()) 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {target}
      </Text>
    </View>
  )
}

export default Game

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gray'
    },
    header:{
        fontSize: 40,
        backgroundColor: 'red',
        marginHorizontal: 50,
        textAlign:'center'
    }
})
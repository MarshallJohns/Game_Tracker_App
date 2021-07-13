import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';


export default function App() {
  const phases = ['Command', 'Movement', 'Psychic', 'Shooting', 'Charge', 'Fight', 'Morale']
  // *Victory Points
  const [redPoints, setRedPoints] = useState(0)
  const [bluePoints, setBluePoints] = useState(0)
  //* Command Points  
  const [redCp, setRedCP] = useState(0)
  const [blueCp, setBlueCP] = useState(0)
  //*Phase
  const [phase, setPhase] = useState(0)

  const handleScore = (player, value) => {
    if (player === 'red') {
      value === '+' ? setRedPoints(redPoints + 1) : redPoints > 0 ? setRedPoints(redPoints - 1) : null
    }
    if (player === 'blue') {
      value === '+' ? setBluePoints(bluePoints + 1) : bluePoints > 0 ? setBluePoints(bluePoints - 1) : null
    }
  }

  return (
    <SafeAreaView style={styles.row}>
      <View style={styles.col, styles.red}>
        <Text >{redPoints}</Text>
        <View style={styles.row}>
          <Button onPress={() => handleScore('red', '+')} title="+" />
          <Button onPress={() => handleScore('red', '-')} title="-" />
        </View>
      </View>
      <View style={styles.col, styles.blue}>
        <Text>{bluePoints}</Text>
        <View style={styles.row}>
          <Button onPress={() => handleScore('blue', '+')} title="+" />
          <Button onPress={() => handleScore('blue', '-')} title="-" />
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',

  },
  col: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50

  },
  blue: {
    backgroundColor: 'blue',
  },
  red: {
    backgroundColor: 'red'
  },

});

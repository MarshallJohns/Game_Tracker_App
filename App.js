import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert } from 'react-native';




export default function App() {
  const phases = ['Command', 'Movement', 'Psychic', 'Shooting', 'Charge', 'Fight', 'Morale'];
  // *Victory Points
  const [redPoints, setRedPoints] = useState(0);
  const [bluePoints, setBluePoints] = useState(0);
  //* Command Points  
  const [redCp, setRedCP] = useState(0);
  const [blueCp, setBlueCP] = useState(0);
  //*Phase
  const [phase, setPhase] = useState(0);
  //*Battle 
  const [battleRound, setBattleRound] = useState(1);
  const [playerTurn, setPlayerTurn] = useState(undefined);
  const [redTurnNum, setRedTurnNum] = useState(0);
  const [blueTurnNum, setBlueTurnNum] = useState(0)

  const handleScore = (player, value) => {
    if (player === 'red') {
      value === '+' ? setRedPoints(redPoints + 1) : redPoints > 0 ? setRedPoints(redPoints - 1) : null
    }
    if (player === 'blue') {
      value === '+' ? setBluePoints(bluePoints + 1) : bluePoints > 0 ? setBluePoints(bluePoints - 1) : null
    }
  };

  const handleCP = (player, value) => {
    if (player === 'red') {
      value === '+' ? setRedCP(redCp + 1) : redCp > 0 ? setRedCP(redCp - 1) : null
    }
    if (player === 'blue') {
      value === '+' ? setBlueCP(blueCp + 1) : blueCp > 0 ? setBlueCP(blueCp - 1) : null
    }
  };

  const handleBlueTurn = () => {
    setPlayerTurn('Blue');
    setBlueTurnNum(blueTurnNum + 1)
    setBlueCP(blueCp + 1)
  };
  const handleRedTurn = () => {
    setPlayerTurn('Red');
    setRedTurnNum(redTurnNum + 1)
    setRedCP(redCp + 1)
  };

  const handlePhase = () => {
    if (phase === phases.length - 1) {
      redTurnNum === blueTurnNum ? setBattleRound(battleRound + 1) : null
      setPhase(0)
      playerTurn === 'Red' ? handleBlueTurn() : handleRedTurn()
    } else {
      setPhase(phase + 1)
    }
  };

  const handlePlayerAlert = () => {
    Alert.alert(
      "Which player will go first?",
      "Select a player",
      [
        {
          text: "Red Player",
          onPress: () => handleRedTurn()
        },
        {
          text: "Blue player",
          onPress: () => handleBlueTurn()

        }
      ]
    );
  }

  useEffect(() => {
    handlePlayerAlert()
  }, [])

  while (battleRound <= 5) {
    return (
      <SafeAreaView style={styles.col}>

        <View>
          <Text style={styles.battleRound}> {redTurnNum === blueTurnNum ? 'Bottom of ' : 'Top of'} Battle Round {battleRound}</Text>
          <Text> {playerTurn} Player's {phases[phase]} Phase </Text>
          <Button onPress={() => handlePhase()} title='Next Phase' />
        </View>

        <View style={styles.points}>
          <View style={styles.col, styles.red}>
            <Text>Red Player's Victory Points</Text>
            <Text >{redPoints}</Text>
            <View style={styles.row}>
              <Button onPress={() => handleScore('red', '+')} title="+" />
              <Button onPress={() => handleScore('red', '-')} title="-" />
            </View>
            <Text>Red Player's Command Points </Text>
            <Text>{redCp}</Text>
            <View style={styles.row}>
              <Button onPress={() => handleCP('red', '+')} title="+" />
              <Button onPress={() => handleCP('red', '-')} title="-" />
            </View>
          </View>

          <View style={styles.col, styles.blue}>
            <Text>Blue Player's Victory Points</Text>
            <Text>{bluePoints}</Text>
            <View style={styles.row}>
              <Button onPress={() => handleScore('blue', '+')} title="+" />
              <Button onPress={() => handleScore('blue', '-')} title="-" />
            </View>
            <Text>Blue Player's Command Points </Text>
            <Text>{blueCp}</Text>
            <View style={styles.row}>
              <Button onPress={() => handleCP('blue', '+')} title="+" />
              <Button onPress={() => handleCP('blue', '-')} title="-" />
            </View>
          </View>

        </View>

      </SafeAreaView>
    )
  };

  return <SafeAreaView>
    {redPoints > bluePoints ? <Text>Congratulations Red player you won</Text> : <Text> Congratulations Blue player you won</Text>}
    <Button onPress={() => { }} title='Play again?' />

  </SafeAreaView>
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  points: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '98%'
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blue: {
    backgroundColor: 'blue',
  },
  red: {
    backgroundColor: 'red'
  },
  battleRound: {
    textAlign: 'center'
  }

});

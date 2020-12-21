import React, { useState, useRef, useEffect } from 'react';
import { number, func } from 'prop-types';
import {
  View, Text, StyleSheet, Button, Alert,
} from 'react-native';
import NumberContainer from './NumberContainer';
import Card from './Card';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    maxWidth: '80%',
    width: 300,
  },
  screen: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
});

const generateRandomBetween = (min, max, exclude) => {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);
  const randNum = Math.floor(Math.random() * (maxNum - minNum)) + minNum;
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return randNum;
};

const GameScreen = ({ userChoice, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice));
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice)
      || (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert(
        'Don\'t lie!',
        'You know that this is wrong...',
        [{ text: 'Sorry', style: 'cancel' }],
      );
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds((curRounds) => curRounds + 1);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent&apos;s Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler('lower')} />
        <Button title="GREATER" onPress={() => nextGuessHandler('greater')} />
      </Card>
    </View>
  );
};

GameScreen.propTypes = {
  userChoice: number.isRequired,
  onGameOver: func.isRequired,
};

export default GameScreen;

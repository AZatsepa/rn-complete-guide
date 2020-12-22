import React, { useState, useRef, useEffect } from 'react';
import { number, func } from 'prop-types';
import {
  View, Text, StyleSheet, Alert, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    maxWidth: '90%',
    width: 400,
  },
  list: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listContainer: {
    flex: 1,
    width: '80%',
  },
  listItem: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    padding: 15,
    width: '60%',
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

const renderListItem = (guess, numOfRounds) => (
  <View key={guess} style={styles.listItem}>
    <BodyText>
      #
      {numOfRounds}
      &nbsp;
    </BodyText>
    <BodyText>{guess}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
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
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent&apos;s Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, guessIndex) => (
            renderListItem(guess, pastGuesses.length - guessIndex)
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

GameScreen.propTypes = {
  userChoice: number.isRequired,
  onGameOver: func.isRequired,
};

export default GameScreen;

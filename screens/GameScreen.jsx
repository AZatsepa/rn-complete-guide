import React, { useState, useRef, useEffect } from 'react';
import { number, func } from 'prop-types';
import {
  View, Text, StyleSheet, Alert, FlatList, Dimensions,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
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
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    maxWidth: '90%',
    width: 400,
  },
  list: {
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
    width: '100%',
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

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>
      #
      {listLength + itemData.index}
      &nbsp;
    </BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [currentGuess, setCurrentGuess] = useState(initialGuess.toString());
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
    setPastGuesses((curPastGuesses) => [nextNumber.toString(), ...curPastGuesses]);
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
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={(itemData) => renderListItem(pastGuesses.length, itemData)}
        />
      </View>
    </View>
  );
};

GameScreen.propTypes = {
  userChoice: number.isRequired,
  onGameOver: func.isRequired,
};

export default GameScreen;

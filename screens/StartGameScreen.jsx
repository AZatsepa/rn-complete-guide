import React, { useState } from 'react';
import { func } from 'prop-types';
import {
  View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert,
} from 'react-native';
import Colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const styles = StyleSheet.create({
  button: {
    width: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%',
  },
  input: {
    minWidth: 50,
    textAlign: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    maxWidth: '80%',
    width: 300,
  },
  screen: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  summaryContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 10,
  },
});

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => setEnteredValue('');

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue, 10);
    if (Number.isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay ', style: 'destructive', onPress: resetInputHandler }]);
      return;
    }

    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetInputHandler} colour={Colors.accent} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={confirmInputHandler} colour={Colors.primary} />
            </View>
          </View>
        </Card>
        {selectedNumber
        && (
          <Card style={styles.summaryContainer}>
            <BodyText>You selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => onStartGame(selectedNumber)}>START GAME</MainButton>
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

StartGameScreen.propTypes = {
  onStartGame: func.isRequired,
};

export default StartGameScreen;

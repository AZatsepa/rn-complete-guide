import React, { useState, useEffect } from 'react';
import { func } from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const styles = StyleSheet.create({
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
    maxWidth: '95%',
    minWidth: 300,
    width: '80%',
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
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const updateLayout = () => setButtonWidth(Dimensions.get('window').width / 4);
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  });

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

    setEnteredValue('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                <View style={{ width: buttonWidth }}>
                  <Button title="Reset" onPress={resetInputHandler} colour={Colors.accent} />
                </View>
                <View style={{ width: buttonWidth }}>
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

StartGameScreen.propTypes = {
  onStartGame: func.isRequired,
};

export default StartGameScreen;

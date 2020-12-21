import React from 'react';
import { number, func } from 'prop-types';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => (
  <View style={styles.screen}>
    <Text>The Game Is Over!</Text>
    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
    <Text>Number of rounds: {roundsNumber}</Text>
    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
    <Text>Number was: {userNumber}</Text>
    <Button title="NEW GAME" onPress={onRestart} />
  </View>
);

GameOverScreen.propTypes = {
  roundsNumber: number.isRequired,
  userNumber: number.isRequired,
  onRestart: func.isRequired,
};

export default GameOverScreen;

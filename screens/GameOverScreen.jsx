import React from 'react';
import { number, func } from 'prop-types';
import {
  View, StyleSheet, Button, Image,
} from 'react-native';

import SuccessImage from '../assets/success.png';

import BodyText from '../components/BodyText';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    borderColor: Colors.black,
    borderRadius: 150,
    borderWidth: 3,
    height: 300,
    marginVertical: 30,
    overflow: 'hidden',
    width: 300,
  },
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => (
  <View style={styles.screen}>
    <BodyText>The Game Is Over!</BodyText>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={SuccessImage}
      />
    </View>
    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
    <BodyText>Number of rounds: {roundsNumber}</BodyText>
    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
    <BodyText>Number was: {userNumber}</BodyText>
    <Button title="NEW GAME" onPress={onRestart} />
  </View>
);

GameOverScreen.propTypes = {
  roundsNumber: number.isRequired,
  userNumber: number.isRequired,
  onRestart: func.isRequired,
};

export default GameOverScreen;

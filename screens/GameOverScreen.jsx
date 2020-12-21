import React from 'react';
import { number, func } from 'prop-types';
import {
  View, StyleSheet, Button, Image, Text,
} from 'react-native';

import SuccessImage from '../assets/success.png';

import BodyText from '../components/BodyText';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  hilight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
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
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',
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
    <View style={styles.resultContainer}>
      <BodyText style={styles.resultText}>
        Your phone needed&nbsp;
        <Text style={styles.hilight}>{roundsNumber}</Text>
        &nbsp;rounds to guess the number&nbsp;
        <Text style={styles.hilight}>{userNumber}</Text>
      </BodyText>
    </View>
    <Button title="NEW GAME" onPress={onRestart} />
  </View>
);

GameOverScreen.propTypes = {
  roundsNumber: number.isRequired,
  userNumber: number.isRequired,
  onRestart: func.isRequired,
};

export default GameOverScreen;

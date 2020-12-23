import React from 'react';
import { number, func } from 'prop-types';
import {
  View, StyleSheet, Image, Text, Dimensions, ScrollView,
} from 'react-native';

import SuccessImage from '../assets/success.png';

import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  gameOverText: {
    paddingVertical: 10,
  },
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
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    height: Dimensions.get('window').width * 0.7,
    marginVertical: Dimensions.get('window').height / 30,
    overflow: 'hidden',
    width: Dimensions.get('window').width * 0.7,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 40,
  },
  resultText: {
    fontSize: Dimensions.get('window').height > 400 ? 16 : 20,
    textAlign: 'center',
  },
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
  },
});

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => (
  <ScrollView>
    <View style={styles.screen}>
      <BodyText style={styles.gameOverText}>The Game Is Over!</BodyText>
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
      <MainButton onPress={onRestart}>NEW GAME</MainButton>
    </View>
  </ScrollView>
);

GameOverScreen.propTypes = {
  roundsNumber: number.isRequired,
  userNumber: number.isRequired,
  onRestart: func.isRequired,
};

export default GameOverScreen;

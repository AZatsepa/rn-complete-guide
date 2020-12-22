import React from 'react';
import { func } from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

const MainButton = ({ onPress, children }) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </View>
  </TouchableOpacity>
);

MainButton.propTypes = {
  onPress: func.isRequired,
};

export default MainButton;

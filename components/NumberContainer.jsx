import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Colors.accent,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
  },
  number: {
    color: Colors.accent,
    fontSize: 22,
  },
});

const NumberContainer = ({ children }) => (
  <View style={styles.container}>
    <Text style={styles.number}>{children}</Text>
  </View>
);

export default NumberContainer;

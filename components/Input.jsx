import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    height: 30,
    marginVertical: 10,
  },
});

// eslint-disable-next-line react/jsx-props-no-spreading,react/destructuring-assignment
const Input = (props) => <TextInput {...props} style={{ ...styles.input, ...props.style }} />;

export default Input;

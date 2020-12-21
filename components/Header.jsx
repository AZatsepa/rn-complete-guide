import React from 'react';
import { string } from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 90,
    justifyContent: 'center',
    paddingTop: 36,
    width: '100%',
  },
  headerTitle: {
    color: Colors.black,
    fontSize: 18,
  },
});

const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

Header.propTypes = {
  title: string.isRequired,
};

export default Header;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colours';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    elevation: 5,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
  },
});

const Card = ({ style, children }) => <View style={{ ...styles.card, ...style }}>{children}</View>;

Card.propTypes = {
};

export default Card;

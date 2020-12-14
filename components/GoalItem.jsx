import React from 'react';
import { string, func } from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { $black, $lightGrey } from '../src/constants/colours';

const styles = StyleSheet.create({
  inputText: {
    backgroundColor: $lightGrey,
    borderColor: $black,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
});

const GoalItem = ({ id, title, onDelete }) => (
  <TouchableHighlight onPress={() => onDelete(id)}>
    <View style={styles.inputText}>
      <Text>{title}</Text>
    </View>
  </TouchableHighlight>
);

GoalItem.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  onDelete: func.isRequired,
};

export default GoalItem;

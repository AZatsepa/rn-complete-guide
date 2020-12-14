import React, { useState } from 'react';
import { func, bool } from 'prop-types';
import {
  Button, TextInput, View, StyleSheet, Modal,
} from 'react-native';
import { $black } from '../src/constants/colours';

const styles = StyleSheet.create({
  button: {
    width: '40%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  input: {
    borderColor: $black,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  inputContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
});

const GoalInput = ({ onAddGoal, onCancel, visible }) => {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    onAddGoal(enteredGoal);
    setEnteredGoal('');
  };

  const cancelAddGoalHandler = () => {
    onCancel();
    setEnteredGoal('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={cancelAddGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Add" onPress={addGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

GoalInput.propTypes = {
  visible: bool.isRequired,
  onAddGoal: func.isRequired,
  onCancel: func.isRequired,
};

export default GoalInput;

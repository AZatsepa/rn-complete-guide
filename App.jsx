import React, { useState } from 'react';
import {
  StyleSheet, View, FlatList, Button,
} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (enteredGoal) => {
    setCourseGoals((currentGoals) => (
      [...currentGoals, { id: Math.random().toString(), value: enteredGoal }]
    ));
    setIsAddMode(false);
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => (
      currentGoals.filter((goal) => goal.id !== goalId)
    ));
  };
  return (
    <View style={styles.screen}>
      <Button
        title="Add New Goal"
        onPress={() => setIsAddMode(true)}
      />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

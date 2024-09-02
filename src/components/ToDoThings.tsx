import React, { memo } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const ToDoThings = ({ item, color, index, onPress }: any) => {
  console.log('index', index);
  
  return (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemText, {color: color}]}>{item}</Text>
      <Button onPress={() => onPress(index)} title="Delete"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
  },
});

export default memo(ToDoThings);

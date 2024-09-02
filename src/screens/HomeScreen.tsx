import React, { useState, useCallback, useMemo, useContext } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import ToDoThings from '../components/ToDoThings';
import useTheme from '../hooks/useTheme';

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  
  const { theme, toggleTheme } = useTheme();
  const backgroundColor = theme?.colors?.background 
  
  const [inputValue, setInputValue] = useState('');

  const addTodo = useCallback(() => {
    if (inputValue) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  }, [inputValue, todos]);

  const handleDelete = useCallback((index) => {
    setTodos(todos.filter((elem, i) => i !== index));
  }, [todos]);

  const renderItem = useCallback(({ item, index }) => <ToDoThings index={index} item={item} color={backgroundColor === '#fff' ? '#000' : '#fff'} onPress={handleDelete} />, [backgroundColor, handleDelete]);

  const memoizedTodos = useMemo(() => todos, [todos]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <TextInput
        // ref={todoInputRef}
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.buttonBackground }]}
        placeholder="Enter a task"
        placeholderTextColor={theme.colors.text}
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Add Task" onPress={addTodo} color={theme.colors.buttonBackground} />
      <Button title="Toggle Theme" onPress={toggleTheme} color={theme.colors.buttonBackground} />
      <FlatList
        data={memoizedTodos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;

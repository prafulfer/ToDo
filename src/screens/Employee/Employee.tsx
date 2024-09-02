import React, { useState, useEffect } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployeeStart, deleteEmployeeStart, requestEmployeeData, updateEmployeeRequest } from '../../redux/slices/employee-slice';
import { styles } from './styles/styles';

export const Employee: React.FC = () => {
  const { employeeData } = useSelector((state: any) => state.employee);
  const dispatch = useDispatch();

  // States for form inputs
  const [employeeName, setEmployeeName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');

  // State for selected employee
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(requestEmployeeData());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteEmployeeStart(id));
    dispatch(requestEmployeeData());
  };

  const handleCreate = () => {
    if (employeeName && salary && age) {
      dispatch(createEmployeeStart({ employeeName, salary, age }));
      // Clear form fields after creating
      setEmployeeName('');
      setSalary('');
      setAge('');
    }
  };

  const handleUpdate = () => {
    if (selectedEmployeeId !== null && employeeName && salary && age) {
      const userData = { employeeName, salary, age };
      dispatch(updateEmployeeRequest({ id: selectedEmployeeId, data: userData }));
      // Clear form fields and selected employee ID after updating
      setSelectedEmployeeId(null);
      setEmployeeName('');
      setSalary('');
      setAge('');
    }
  };

  const handleEditClick = (user) => {
    setSelectedEmployeeId(user.id);
    setEmployeeName(user.employee_name);
    setSalary(user.employee_salary);
    setAge(user.employee_age);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={employeeName}
        onChangeText={setEmployeeName}
      />

      <Text style={styles.label}>Salary</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your salary"
        keyboardType="numeric"
        value={salary}
        onChangeText={setSalary}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      
      {selectedEmployeeId ? (
        <Button title="Update" onPress={handleUpdate} />
      ) : (
        <Button title="Submit" onPress={handleCreate} />
      )}

      <ScrollView>
        {employeeData.map((user) => (
          <View key={user.id} style={styles.userContainer}>
            <Text>{user.employee_name}</Text>
            <Text> {user.employee_salary}</Text>
            <Text>{user.employee_age}</Text>
            <Button title="Update" onPress={() => handleEditClick(user)} />
            <Button title="Delete" onPress={() => handleDelete(user.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

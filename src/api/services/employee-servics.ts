import { Alert } from 'react-native';
import {axiosInstance} from '../../config/axiosConfig'
import { employee_delete, employees, employee_create, employee_update } from '../endpoints';

const getEmployeeDataApi = async () => {
  try {
    const response = await axiosInstance.get(employees);
    return response.data;
  } catch (e) {
    Alert.alert(e.response.data.message)
    console.log('Error calling getEmployee api', e);
  }
};

const EmployeeDeleteApi = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`${employee_delete}/${id}`);
    if(response.data){
      Alert.alert(response.data.message)
    }
    return response.data;
  } catch (e: any) {
    Alert.alert(e.response.data.message)
    console.log('Error calling Delete api', e.response.data.message);
  }
};

const EmployeeCreateApi = async (payload) => {
  try {
    const response = await axiosInstance.post(employee_create, JSON.stringify(payload));
    if(response.data){
      Alert.alert(response.data.message)
    }
    return response.data;
  } catch (e) {
    Alert.alert(e.response.data.message)
    console.log('Error calling creareEmployee api', e);
  }
};

const EmployeeUpdateApi = async (id, payload) => {
  console.log('${employee_update}/${id}`', `${employee_update}/${id}`);
  
  try {
    const response = await axiosInstance.put(`${employee_update}/${id}`, JSON.stringify(payload));
    if(response.data){
      Alert.alert(response.data.message)
    }
    return response.data;
  } catch (e) {
    Alert.alert(e.response.data.message)
    console.log('Error calling creareEmployee api', e);
  }
};

export {getEmployeeDataApi, EmployeeDeleteApi, EmployeeCreateApi, EmployeeUpdateApi};

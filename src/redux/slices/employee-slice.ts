import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  employeeData: [],
  loading: false,
  error: '',
};

const employee = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    requestEmployeeData: state => {
      state.loading = true;
    },
    employeeDataSuccess: (state, action) => {
      state.loading = false;
      state.employeeData = action.payload.data;
      state.error = '';
    },
    employeeDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete actions
    deleteEmployeeStart: state => {
      state.loading = true;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employeeData = state.employeeData.filter(
        employee => employee.id !== action.payload
      );
      state.error = '';
    },
    deleteEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create actions
    createEmployeeStart: state => {
      state.loading = true;
    },
    createEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    createEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateEmployeeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employeeData = state.employeeData.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload.data } : user
      );
    },
    updateEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default employee.reducer;
export const {
  requestEmployeeData,
  employeeDataSuccess,
  employeeDataFailure, 
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  createEmployeeStart,
  createEmployeeSuccess,
  createEmployeeFailure,
  updateEmployeeRequest,
  updateEmployeeSuccess,
  updateEmployeeFailure,
} = employee.actions;

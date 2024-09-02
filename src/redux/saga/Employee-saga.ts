import {call, put, takeEvery} from 'redux-saga/effects';
import {
  createEmployeeFailure,
  createEmployeeStart,
  createEmployeeSuccess,
  deleteEmployeeFailure,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  employeeDataFailure,
  employeeDataSuccess,
  requestEmployeeData,
  updateEmployeeFailure,
  updateEmployeeRequest,
  updateEmployeeSuccess,
} from '../slices/employee-slice';
import { EmployeeCreateApi, EmployeeDeleteApi, EmployeeUpdateApi, getEmployeeDataApi } from '../../api/services/employee-servics';
function* getEmployeeData() {
  try {
    const response = yield call(getEmployeeDataApi);
    if (response) {
      yield put(
        employeeDataSuccess({
          data: response.data,
        }),
      );
    }
  } catch (e) {
    yield put(employeeDataFailure(e));
  }
}

export function* watchGetEmployeeData() {
  yield takeEvery(requestEmployeeData.type, getEmployeeData);
}

function* getEmployeeDelete(action) {
  try {
    const response = yield call(EmployeeDeleteApi, action.payload);
    if (response) {
      yield put(
        deleteEmployeeSuccess(action.payload),
      );
    }
  } catch (e) {
    yield put(deleteEmployeeFailure(e));
  }
};

export function* watchDeleteEmployee() {
  yield takeEvery(deleteEmployeeStart.type, getEmployeeDelete);
};

function* createEmployeeSaga(action) {
  try {
    const response = yield call(EmployeeCreateApi, {
        name: action.payload.employeeName,
        salary: action.payload.salary,
        age: action.payload.age,
    });
    yield put(createEmployeeSuccess(response.data));
  } catch (error) {
    yield put(createEmployeeFailure(error));
  }
}

export function* watchCreateEmployee() {
  yield takeEvery(createEmployeeStart.type, createEmployeeSaga);
};


function* updateEmpoloyeeSaga(action) {
  try {
    const { id, data } = action.payload;
    console.log('data', id, data);
    
    yield call(EmployeeUpdateApi, id, data);
    yield put(updateEmployeeSuccess({ id, data }));
  } catch (error) {
    yield put(updateEmployeeFailure(error.message));
  }
}

export function* watchUpdateEmployee() {
  yield takeEvery(updateEmployeeRequest.type, updateEmpoloyeeSaga);
};

import {all} from 'redux-saga/effects';
import { watchGetEmployeeData, watchDeleteEmployee, watchCreateEmployee, watchUpdateEmployee } from './Employee-saga';

export default function* rootSaga() {
  yield all([watchGetEmployeeData(), watchDeleteEmployee(), watchCreateEmployee(), watchUpdateEmployee()]);
}

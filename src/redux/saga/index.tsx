import {all} from 'redux-saga/effects';
import { watchGetEmployeeData, watchDeleteEmployee, watchCreateEmployee, watchUpdateEmployee } from './Employee-saga';
import { watchSendMessage } from './chat-saga';

export default function* rootSaga() {
  yield all([watchGetEmployeeData(), watchDeleteEmployee(), watchCreateEmployee(), watchUpdateEmployee(), watchSendMessage(),]);
}

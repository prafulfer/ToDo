import { configureStore } from "@reduxjs/toolkit";
import employee from "./slices/employee-slice";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
      employee,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });
  
  sagaMiddleware.run(rootSaga);
  
  export default store;
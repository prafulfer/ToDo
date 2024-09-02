import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { Employee } from './src/screens/Employee/Employee';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
    <ThemeProvider>
      <Employee />
      {/* <HomeScreen /> */}
    </ThemeProvider>
    </Provider>
  );
};

export default App;

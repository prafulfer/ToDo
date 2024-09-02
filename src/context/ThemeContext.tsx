import React, { useState, createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = {
    isDarkTheme,
    colors: {
      background: isDarkTheme ? '#333' : '#fff',
      text: isDarkTheme ? '#fff' : '#333',
      buttonBackground: isDarkTheme ? '#555' : '#ddd',
      buttonText: isDarkTheme ? '#fff' : '#333',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

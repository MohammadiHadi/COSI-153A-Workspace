import { createContext, useState, useContext } from "react";

// Create the Context
const ThemeContext = createContext();

// Create a Provider
export const ThemeProvider = ({ children }) => {
  // state to keep the current theme
  const [isDarkMode, setIsDarkMode] = useState(false);
  // a helper function to switch themes
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  // value that will be shared with all screens
  const value = { isDarkMode, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
// Create a small helper to use the context easily
export const useTheme = () => useContext(ThemeContext);

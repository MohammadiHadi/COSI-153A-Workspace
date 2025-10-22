import { createContext, useState, useContext } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};


// Create the Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a Provider
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
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
// export const useTheme = () => useContext(ThemeContext);
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

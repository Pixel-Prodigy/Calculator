import React from "react";
import { useState, createContext } from "react";
export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme(!theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

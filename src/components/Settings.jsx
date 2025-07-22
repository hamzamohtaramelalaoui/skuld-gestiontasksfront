import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Settings = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>
      <div className="mt-4 flex items-center space-x-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
            className="hidden"
          />
          <span className={`w-10 h-5 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-all duration-500`}>
            <span className={`block w-4 h-4 bg-white dark:bg-gray-900 rounded-full transform transition-all duration-500 ${darkMode ? "translate-x-5" : ""}`}></span>
          </span>
        </label>
        <span className="text-lg font-medium">
          {darkMode ? "Mode Clair ☀️" : "Mode Sombre 🌙"}
        </span>
      </div>
    </div>
  );
};

export default Settings;

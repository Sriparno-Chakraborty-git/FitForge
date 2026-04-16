import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateWorkoutPlan } from '../utils/workoutEngine';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fitforge_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [workoutPlan, setWorkoutPlan] = useState(() => {
    const saved = localStorage.getItem('fitforge_plan');
    return saved ? JSON.parse(saved) : null;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('fitforge_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('fitforge_theme') || 'dark';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('fitforge_user', JSON.stringify(user));
    }
    if (workoutPlan) {
      localStorage.setItem('fitforge_plan', JSON.stringify(workoutPlan));
    }
    localStorage.setItem('fitforge_history', JSON.stringify(history));
    localStorage.setItem('fitforge_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [user, workoutPlan, history, theme]);

  const login = (userData) => {
    setUser(userData);
    if (!workoutPlan) {
      const plan = generateWorkoutPlan(userData);
      setWorkoutPlan(plan);
    }
  };

  const logout = () => {
    setUser(null);
    setWorkoutPlan(null);
    localStorage.removeItem('fitforge_user');
    localStorage.removeItem('fitforge_plan');
  };

  const updateProfile = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    const newPlan = generateWorkoutPlan(updatedUser);
    setWorkoutPlan(newPlan);
  };

  const completeWorkout = (dayId) => {
    const newEntry = {
      date: new Date().toISOString(),
      dayId: dayId,
      workoutName: workoutPlan.find(d => d.day === dayId)?.name || 'Unknown'
    };
    setHistory([...history, newEntry]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, workoutPlan, updateProfile, 
      completeWorkout, history, theme, toggleTheme 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

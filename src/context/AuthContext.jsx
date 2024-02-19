import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useReducer, useState } from 'react';
import { auth } from '../firebase/firebaseCofig';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          dispatch({ type: 'LOGIN_USER', payload: user });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      },
      (error) => {
        console.error(error);
        // Handle error, e.g., show a message to the user
      }
    );

    return unsubscribe;
  }, [auth]);

  const login = (user) => {
    dispatch({ type: 'LOGIN_USER', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {!state.isLoading && children}
    </AuthContext.Provider>
  );
}

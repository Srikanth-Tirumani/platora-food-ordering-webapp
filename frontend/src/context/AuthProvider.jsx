import React, { useState } from 'react';
import { AuthContext } from './AuthContext';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || null
  );

  const login = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const register = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const updateProfile = (updatedInfo) => {
    setUser((prevUser) => {
      const newUser = {
        ...prevUser,
        ...updatedInfo,
        token: updatedInfo.token || prevUser?.token,
      };
      localStorage.setItem('userInfo', JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

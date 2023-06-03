import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setSnackbarOpen(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}

      {/* Message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Log out success"
        autoHideDuration={500}
        key={'snackbar'}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
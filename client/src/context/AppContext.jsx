import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); 

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      
      setIsLoggedIn(false);
      console.log('User not authenticated');
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/data');
      if (data.success) {
        setUserData(data.data);
        setIsLoggedIn(true); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      if (isLoggedIn) {
        toast.error(error.response?.data?.message || 'Failed to get user data');
      }
      console.log('Failed to get user data:', error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};

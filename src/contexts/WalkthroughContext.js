import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { guidedTourMain } from '../joyride/tour-main';
import { guidedTourSearchPopup } from '../joyride/tour-searchpopup';

const WalkthroughContext = createContext();

export const WalkthroughProvider = ({ children }) => {
  const [run, setRun] = useState(false);  // Initialize as false to prevent auto-running
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isSearchPopupVisible, setIsSearchPopupVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {  // Check if the current path is the main page
      setRun(true);  // Enable the walkthrough
      if (isSearchPopupVisible) {
        setSteps(guidedTourSearchPopup);
        console.log('Search popup walkthrough steps:', guidedTourSearchPopup);
      } else {
        setSteps(guidedTourMain);
        console.log('Main walkthrough steps:', guidedTourMain);
      }
      console.log('isSearchPopupVisible:', isSearchPopupVisible);
    } else {
      setRun(false);  // Disable the walkthrough for other pages
    }
  }, [router.pathname, isSearchPopupVisible]);

  const toggleSearchPopupVisibility = () => {
    setIsSearchPopupVisible((prev) => !prev);
  };

  return (
    <WalkthroughContext.Provider value={{ run, setRun, stepIndex, setStepIndex, steps, toggleSearchPopupVisibility, isSearchPopupVisible }}>
      {children}
    </WalkthroughContext.Provider>
  );
};

export const useWalkthrough = () => useContext(WalkthroughContext);

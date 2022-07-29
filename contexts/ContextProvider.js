import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({});

const initialState = {
  addOverlay: false,
  chatOverlay: false,
  notificationOverlay: false,
  profileOverlay: false,
  createOrUpdateProjectOverlay: false,
  deleteActionOverlay: false,
  createOrUpdateTaskTaskOverlay: false,
};
const ContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  const handleClose = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: false });
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isClicked,
        setIsClicked,
        handleClick,
        handleClose,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useContextState = () => {
  return useContext(AppContext);
};

export default ContextProvider;

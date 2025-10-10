import React, { createContext, useState } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

// default values are initial state to provide
export const ModalContext = createContext({
  openHowTo: false,
  toggleHowTo: () => {},
  openAbout: false,
  toggleAbout: () => {},
  openLogIn: false,
  toggleLogIn: () => {},
});

export const ContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [openHowTo, setHowTo] = useState<boolean>(false);
  const [openAbout, setOpenAbout] = useState<boolean>(false);
  const [openLogIn, setLogIn] = useState<boolean>(false);

  function toggleHowTo() {
    setHowTo(!openHowTo);
  }

  function toggleAbout() {
    setOpenAbout(!openAbout);
  }

  function toggleLogIn() {
    setLogIn((x) => !x);
  }

  return (
    <ModalContext.Provider
      value={{
        openHowTo,
        toggleHowTo,
        openAbout,
        toggleAbout,
        openLogIn,
        toggleLogIn,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

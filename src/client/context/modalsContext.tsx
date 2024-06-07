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
});

export const ContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [openHowTo, SetHowTo] = useState<boolean>(false);
  const [openAbout, setOpenAbout] = useState<boolean>(false);

  function toggleHowTo() {
    SetHowTo(!openHowTo);
  }

  function toggleAbout() {
    setOpenAbout(!openAbout);
  }

  return (
    <ModalContext.Provider
      value={{ openHowTo, toggleHowTo, openAbout, toggleAbout }}
    >
      {children}
    </ModalContext.Provider>
  );
};

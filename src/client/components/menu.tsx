import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HowToPlay from './modals/howToPlay';
import TermsAndConditions from './modals/terms';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import { Google } from '@mui/icons-material';

interface MenuProps {
  anchorEl: HTMLElement;
  handleClose: () => void;
  toggleTheme: () => void;
  darkMode: boolean;
  open: boolean;
}

const BurgerMenu = React.forwardRef(function (
  { handleClose, toggleTheme, anchorEl, darkMode, open }: MenuProps,
  ref: React.Ref<HTMLElement>
) {
  const [openHowTo, SetHowTo] = useState<boolean>(false);
  const [openTerms, SetTerms] = useState<boolean>(false);

  const auth = getAuth();
  const { user } = useAuth();

  function showHowTo() {
    handleClose();
    SetHowTo(!openHowTo);
  }

  function showTerms() {
    handleClose();
    SetTerms(!openTerms);
  }

  return (
    <div>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'board-menu-button',
          'aria-labelledby': 'board-menu-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={showHowTo}>How to Play</MenuItem>
        <MenuItem
          component={Link}
          href="https://lwtgames.netlify.app/about"
          target="_blank"
          onClick={handleClose}
        >
          Meet the Team
        </MenuItem>
        <MenuItem
          component={Link}
          href="https://lesbianswhotech.org/pridesummit2024/"
          target="_blank"
          onClick={handleClose}
        >
          #LWT Summit
        </MenuItem>
        <MenuItem
          component={Link}
          href="https://lwtgames.netlify.app/home"
          target="_blank"
          onClick={handleClose}
        >
          Interconnected Collective
        </MenuItem>
        <MenuItem onClick={showTerms}>Terms & Conditions</MenuItem>
        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>
            {darkMode ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>{darkMode ? 'Light Mode' : 'Dark Mode'}</ListItemText>
        </MenuItem>
      </Menu>

      <Modal
        aria-labelledby="modal-how-to-play"
        aria-describedby="modal-how-to-play-bingo"
        open={openHowTo}
      >
        <HowToPlay close={SetHowTo}></HowToPlay>
      </Modal>

      <Modal
        aria-labelledby="modal-terms-and-conditions"
        aria-describedby="modal-terms-and-conditions"
        open={openTerms}
      >
        <TermsAndConditions close={SetTerms}></TermsAndConditions>
      </Modal>
    </div>
  );
});

export default BurgerMenu;

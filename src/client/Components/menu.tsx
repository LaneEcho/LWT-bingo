import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HowToPlay from './Modals/HowToPlay';
import TermsAndConditions from './Modals/Terms';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import { Google } from '@mui/icons-material';

interface MenuProps {
  anchorEl: HTMLElement;
  handleClose: () => void;
  toggleTheme: () => void;
  open: boolean;
}

const BurgerMenu = React.forwardRef(function (
  { handleClose, toggleTheme, anchorEl, open }: MenuProps,
  ref: React.Ref<HTMLElement>
) {
  const [openHowTo, SetHowTo] = useState<boolean>(false);
  const [openTerms, SetTerms] = useState<boolean>(false);

  const auth = getAuth();
  const { user } = useAuth();

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
        <MenuItem
          component={Link}
          href="https://incocollective.com/about"
          target="_blank"
          onClick={handleClose}
        >
          Meet the Team
        </MenuItem>
        <MenuItem
          component={Link}
          href="https://lesbianswhotech.org/newyorksummit2024/"
          target="_blank"
          onClick={handleClose}
        >
          #LWT Summit
        </MenuItem>
        <MenuItem
          component={Link}
          href="https://incocollective.com"
          target="_blank"
          onClick={handleClose}
        >
          Interconnected Collective
        </MenuItem>
        <MenuItem onClick={showTerms}>Terms & Conditions</MenuItem>
      </Menu>

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

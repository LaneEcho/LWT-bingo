import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AboutUs from './modals/aboutUs';
import HowToPlay from './modals/howToPlay';

interface MenuProps {
  anchorEl: HTMLElement;
  handleClose: () => void;
  open: boolean;
}

const BurgerMenu: React.FC<MenuProps> = ({ handleClose, anchorEl, open }) => {
  return (
    <div>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
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
        <MenuItem onClick={handleClose}>Meet the Team</MenuItem>
        <MenuItem onClick={handleClose}>#LWT Summit</MenuItem>
        <MenuItem onClick={handleClose}>Interconnected Collective</MenuItem>
        <MenuItem onClick={handleClose}>Get Involved</MenuItem>
        <MenuItem onClick={handleClose}>Terms & Conditions</MenuItem>
      </Menu>
    </div>
  );
};

export default BurgerMenu;

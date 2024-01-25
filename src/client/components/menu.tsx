import React, { useState } from 'react';
import { Toolbar, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavMenu() {
  // set the position of the popover element
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(): void {
    setAnchorEl(null);
  }

  const open: boolean = Boolean(anchorEl);
  const id: string = open ? 'navigation-menu' : undefined;

  function handleLWTClick(): void {
    window.open('https://lesbianswhotech.org/about/', '_blank');
  }

  // how to play and about should show a new modal on click
  // needs to close menu
  // use react context?
  function handleHowToPlayClick() {}

  function handleAboutClick(): void {}

  // time to learn aria labels...
  // these are not quite correct

  return (
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClick}
        aria-describedby={id}
        aria-label="open menu"
        aria-controls={open ? id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{ 'aria-labelledby': 'navigation-button' }}
      >
        <Box
          sx={{
            width: '20vw',
            borderRadius: '8px',
          }}
        >
          <MenuItem onClick={handleHowToPlayClick}>How to Play</MenuItem>
          <MenuItem>About the Team</MenuItem>
          <MenuItem onClick={handleLWTClick}>#LWT</MenuItem>
        </Box>
      </Menu>
    </Toolbar>
  );
}

import React, { useState } from 'react';
import { Toolbar, IconButton, Popover, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Popover
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
      >
        <Box
          sx={{
            width: '20vw',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          Box Content
        </Box>
      </Popover>
    </Toolbar>
  );
}

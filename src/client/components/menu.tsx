import React, { useState } from 'react';
import {
  IconButton,
  MenuItem,
  Grow,
  Paper,
  Popper,
  MenuList,
  Stack,
  ClickAwayListener,
  Modal,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AboutUs from './modals/aboutUs';
import HowToPlay from './modals/howToPlay';

export default function NavMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const [openHowTo, SetHowTo] = useState<boolean>(false);
  const [openAbout, setOpenAbout] = useState<boolean>(false);

  const id: string = open ? 'navigation-menu' : undefined;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // functions for menu clicks
  function handleLWTClick(): void {
    window.open('https://lesbianswhotech.org/about/', '_blank');
  }

  function handleHowToPlayClick() {
    SetHowTo(!openHowTo);
  }

  function handleAboutClick(): void {
    setOpenAbout(!openAbout);
  }

  return (
    <Stack>
      <IconButton
        aria-describedby={id}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="left-start"
        transition
        disablePortal
        sx={{
          zIndex: '10',
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={handleHowToPlayClick}
                    sx={{ fontSize: '1.5rem' }}
                  >
                    How to Play
                  </MenuItem>
                  <MenuItem
                    onClick={handleAboutClick}
                    sx={{ fontSize: '1.5rem' }}
                  >
                    About the Team
                  </MenuItem>
                  <MenuItem
                    onClick={handleLWTClick}
                    sx={{ fontSize: '1.5rem' }}
                  >
                    #LWT
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Modal open={openAbout}>
        <AboutUs close={setOpenAbout}></AboutUs>
      </Modal>
      <Modal open={openHowTo}>
        <HowToPlay close={SetHowTo}></HowToPlay>
      </Modal>
    </Stack>
  );
}

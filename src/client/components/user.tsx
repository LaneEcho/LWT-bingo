import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Avatar, Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';

import UserMenu from './UserMenu';
import { styled } from 'styled-components';
// import { AnchorOutlined } from '@mui/icons-material';

const AvatarLabel = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 14px;
  & > * {
    margin: 4px;
  }
  width: 100px;
`;

const User: React.FC = () => {
  const { user } = useAuth();
  const auth = getAuth();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  // TODO: Clean this modal up!
  // We need to add validation. We need to know if the username already exists
  // Open questions: what do we do if it does exist?

  function showUserMenu(event: React.MouseEvent<HTMLElement>) {
    setShowMenu(true);
    setAnchorEl(event.currentTarget);
  }

  function hideUserMenu() {
    setShowMenu(false);
    setAnchorEl(null);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  return (
    <>
      {
        user?.uid && (
          // <AvatarContainer>
          //   <AvatarLabel>
          <Avatar
            src={user?.photoURL}
            onClick={showUserMenu}
            aria-label="user-menu-button"
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            alt={user?.displayName}
          />
        )
        /*{ <Typography variant="body2"> {user?.displayName}</Typography>
          </AvatarLabel>
        </AvatarContainer> }*/
      }
      <UserMenu handleClose={hideUserMenu} anchorEl={anchorEl} open={open} />
    </>
  );
};

export default User;

import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import { db, updateUser } from '../../firebase/firebase-api';
import { doc } from 'firebase/firestore';
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { getFunctions, httpsCallable } from 'firebase/functions';
import Button from './UI_Elements/Button';
import useAnalytics, { EventName } from '../hooks/useAnalytics';
// import ListItemIcon from '@mui/material/ListItemIcon';

interface MenuProps {
  handleClose: () => void;
  anchorEl: HTMLElement;
  open: boolean;
}

const UserMenu = React.forwardRef(function (
  { handleClose, anchorEl, open }: MenuProps,
  ref: React.Ref<HTMLElement>
) {
  const functions = getFunctions();
  const track = useAnalytics();
  const [openUsernameChange, SetUserChange] = useState<boolean>(false);

  const [isBusy, setIsBusy] = React.useState<boolean>();
  const [isOptedIn, setIsOptedIn] = React.useState<boolean>(false);

  const auth = getAuth();
  const { user } = useAuth();

  const [username, setUsername] = useState(user?.username);
  const [linkedInURL, setLinkedInURL] = useState(user?.linkedInURL);

  function showUserNameChange() {
    handleClose();
    SetUserChange((x) => !x);
  }

  function handleOnCloseClick() {
    // TODO: add confirmation if unsaved changes
    SetUserChange(false);
  }

  function showUsernameForm() {
    SetUserChange(true);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    
    track(EventName.USERNAME_UPDATED, {
      location: 'Modal',
      userId: user?.uid ?? null,
      linkedInURL: user?.linkedInURL ?? null
    });

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        // await setDoc(userRef, { username }, { merge: true });
        await updateUser(user?.uid, username, isOptedIn, linkedInURL);
        SetUserChange(false);
        console.log('User updated!');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }

  function handleLogout() {
    if (user?.email) {
      const userId = user?.uid;
      signOut(auth)
        .then(() => {
          track(EventName.USER_LOGOUT, { userId });
          handleClose();
          console.log('Signed out successfully.');
          //  TODO: add toast!
        })
        .catch((error) => {
          console.log('NOT Signed out, something went wrong.');
        });
    }
  }

  const generateRandomUsername = httpsCallable(
    functions,
    'generateRandomUsername'
  );

  React.useEffect(() => {
    if (!user?.username && !user?.linkedInURL) {
      return;
    }
    setUsername(user?.username);
    setLinkedInURL(user?.linkedInURL)
  }, [user?.username]);

  return (
    <div>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-menu-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
      >
        <MenuItem onClick={showUserNameChange}>Update User</MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog open={openUsernameChange} onClose={handleOnCloseClick}>
        <DialogTitle
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          Update User
          <IconButton onClick={handleOnCloseClick}>
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <div>
            <Typography variant="h6">
              Enter the username you would like to use.
            </Typography>
            <TextField
              name="username"
              disabled={isBusy}
              placeholder={isBusy ? 'Getting random name...' : undefined}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              sx={{ width: '552px', paddingTop: '15px' }}
            />
            <div style={{ flex: 1 }} />
            <Button variant="secondary" onClick={handleGenerateRandom}>
              Random username
            </Button>
          </div>
          <div>
            <Typography 
              variant="h6"
              sx={{ width: '552px', paddingTop: '15px' }}
              >
              Enter the url for your LinkedIn profile.
            </Typography>
            <TextField
              name="linkedInURL"
              onChange={(e) => setLinkedInURL(e.target.value)}
              value={linkedInURL}
              sx={{ width: '552px', paddingTop: '15px' }}
            />
          </div>
          <div>
            {/* style={{ marginTop: '24px' }}> */}
            <FormControlLabel
              control={
                <Checkbox checked={isOptedIn} onChange={handleOnCheckmark} />
              }
              label="Want to stay up-to-date with InCo? Check this box to join our mailing list"
            />
          </div>
          <Button variant="primary" onClick={handleSubmit}>
            Submit your updates to the Leaderboard
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );

  async function getRandomUsername() {
    try {
      setIsBusy(true);
      const generatedUsername = await generateRandomUsername();

      setUsername(generatedUsername.data as string);
    } catch (error) {
      setUsername('');
      console.error('Error fetching random username:', error);
    } finally {
      setIsBusy(false);
    }
  }

  function handleGenerateRandom() {
    getRandomUsername();
  }

  function handleOnCheckmark(e: React.ChangeEvent<HTMLInputElement>) {
    setIsOptedIn(e.target.checked);
  }
});

export default UserMenu;

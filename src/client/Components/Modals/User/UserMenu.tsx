import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../../../hooks/useAuth';
import { db, updateUser } from '../../../../firebase/firebase-api';
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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { getFunctions, httpsCallable } from 'firebase/functions';
import Button from '../../UI_Elements/Button';
import useAnalytics, { EventName } from '../../../hooks/useAnalytics';

interface MenuProps {
  handleClose: () => void;
  anchorEl: HTMLElement;
  open: boolean;
}

type FormData = {
  username: string;
  isOptedIn: boolean;
};

// TODO: Check the handling of the checkbox when we implement functionality

const UserMenu = React.forwardRef(function (
  { handleClose, anchorEl, open }: MenuProps,
  ref: React.Ref<HTMLElement>
) {
  const auth = getAuth();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      isOptedIn: false,
    },
  });

  const functions = getFunctions();
  const track = useAnalytics();
  const [openUsernameChange, SetUserNameChange] = useState<boolean>(false);
  const [isBusy, setIsBusy] = React.useState<boolean>();
  // const [isOptedIn, setIsOptedIn] = React.useState<boolean>(false);

  function showUserNameChange() {
    handleClose();
    SetUserNameChange((x) => !x);
  }

  function handleOnCloseClick() {
    // TODO: add confirmation if unsaved changes
    SetUserNameChange(false);
    reset({ username: user?.username || '', isOptedIn: false }); // resets form values
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const user = auth.currentUser;
    track(EventName.USERNAME_UPDATED, {
      location: 'Modal',
      userId: user?.uid ?? null,
    });

    if (user) {
      try {
        await updateUser(user.uid, data.username, data.isOptedIn);
        SetUserNameChange(false);
        console.log('Username saved!');
      } catch (error) {
        console.error('Error saving username:', error);
      }
    } else {
      console.error('Invalid or missing user');
    }
  };

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

  async function getRandomUsername() {
    try {
      setIsBusy(true);
      const generatedUsername = await generateRandomUsername();
      setValue('username', generatedUsername.data as string);
    } catch (error) {
      console.error('Error fetching random username:', error);
    } finally {
      setIsBusy(false);
    }
  }

  React.useEffect(() => {
    if (!user?.username) {
      return;
    }
    setValue('username', user?.username);
  }, [user?.username]);

  React.useEffect(() => {
    reset({
      username: '',
      isOptedIn: false,
    });
  }, [isSubmitSuccessful]);

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
          Update Username
          <IconButton onClick={handleOnCloseClick}>
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Stack spacing={2} alignItems={'center'}>
            <Typography variant="h6">
              Enter the username you would like to use.
            </Typography>
            <TextField
              name="username"
              {...register('username', {
                required: 'Username is required',
                validate: (value) =>
                  value?.trim() !== '' || 'Username cannot be empty',
              })}
              disabled={isBusy}
              placeholder={isBusy ? 'Getting random name...' : undefined}
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
            />
            <div style={{ flex: 1 }} />
            <Button
              variant="secondary"
              onClick={() => getRandomUsername()}
              sx={{
                width: '15rem',
              }}
            >
              Random username
            </Button>
            {/* <div>
              <FormControlLabel
                control={
                  <Checkbox checked={isOptedIn} onChange={handleOnCheckmark} />
                }
                label="Want to stay up-to-date with InCo? Check this box to join our mailing list"
              />
            </div> */}
            <Controller
              name="isOptedIn"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Want to stay up-to-date with InCo? Check this box to join our mailing list"
                />
              )}
            />
            <Button
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              sx={{
                width: '15rem',
              }}
            >
              Submit your name to the Leaderboard
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default UserMenu;

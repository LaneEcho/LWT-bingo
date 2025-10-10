import React from 'react';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import Button from './UI_Elements/Button';
import { GitHub, Google } from '@mui/icons-material';
import useAnalytics, { EventName } from '../hooks/useAnalytics';

interface IGmailLogin {
  onSuccess: () => void;
}

const GmailLogin: React.FC<IGmailLogin> = ({ onSuccess }) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const { user } = useAuth();
  const track = useAnalytics();

  function handlePopUp() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        track(EventName.USER_LOGIN, { userId: user?.uid });
        onSuccess();
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error?.code;
        const errorMessage = error?.message;
        // The email of the user's account used.
        const email = error?.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        window.alert(
          'Whoops, something went wrong, please try logging in again!'
        );
        // throw new Error('Failed to log in via Gmail.');
      });
  }

  return (
    <Button variant="primary" startIcon={<Google />} onClick={handlePopUp}>
      Gmail Login
    </Button>
  );
};

export default GmailLogin;

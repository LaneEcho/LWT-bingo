import React from "react";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import { GitHub, Google } from "@mui/icons-material";



interface IGmailLogin {
  onSuccess: () => void;
}

const GmailLogin: React.FC<IGmailLogin> = ({ onSuccess }) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const { user } = useAuth();

  function handlePopUp() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
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
        throw new Error(`Failed to log in via Google credential ${credential} with email ${email}. ${errorCode} - ${errorMessage}.`);
      });
  }

  return (
    <Button variant="primary" startIcon={<Google />} onClick={handlePopUp}>
      Gmail Login
    </Button>
  );
};

export default GmailLogin;

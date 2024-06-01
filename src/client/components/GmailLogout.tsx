import React from "react";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import { Google } from "@mui/icons-material";
import User from "./user";

const GmailLogout: React.FC = () => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  const { user } = useAuth();

  function handlePopUp() {
    // This is no longer relevant to this component, but we need to use it logout somewhere
    if (user?.email) {
      signOut(auth)
        .then(() => {
          console.log("Signed out successfully.");
          //  TODO: add toast!
        })
        .catch((error) => {
          console.log("NOT Signed out, something went wrong.");
          //  TODO: add toast!
          // An error happened.
        });
    }
  }

  return user?.uid ? (
    <>
      <User />
      <Button
        variant="secondary"
        //  startIcon={<Google />}
        onClick={handlePopUp}
      >
        Logout
      </Button>
    </>
  ) : null;
};

export default GmailLogout;

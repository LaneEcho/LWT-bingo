import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, updateUser } from "../../firebase/firebase-api";
import { CloseOutlined } from "@mui/icons-material";

const User: React.FC = () => {
  const { user } = useAuth();
  const auth = getAuth();

  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");

  // TODO: Clean this modal up!
  // We need to add validation. We need to know if the username already exists
  // Open questions: what do we do if it does exist?
  return (
    <>
      <Avatar src={user?.photoURL} onClick={showUsernameForm} />
      <Typography>{user?.displayName}</Typography>
      <Dialog open={showForm} onClose={handleOnCloseClick}>
        <DialogTitle>
          Update Username
          <IconButton onClick={handleOnCloseClick}>
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={user?.username ?? ""}
            />
            <button type="submit">Submit</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );

  function handleOnCloseClick() {
    // TODO: add confirmation if unsaved changes
    setShowForm(false);
  }

  function showUsernameForm() {
    setShowForm(true);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        // await setDoc(userRef, { username }, { merge: true });
        await updateUser(user?.uid, username);
        setShowForm(false);
        console.log("Username saved!");
      } catch (error) {
        console.error("Error saving username:", error);
      }
    }
  }
};

export default User;

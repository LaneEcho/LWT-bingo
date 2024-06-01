import React from "react";

import { FunctionComponent } from "react";
import { Button as MuiButton, SxProps, Theme } from "@mui/material";
import { GitHub } from "@mui/icons-material";

interface ButtonProps {
  variant: "primary" | "secondary";
  // 
  onClick: (e?:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

const Button: FunctionComponent<ButtonProps> = ({ variant, children, startIcon, sx, onClick }) => {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  const styles: SxProps<Theme> = {
    margin: "16px 8px",
    borderRadius: "30px",
    boxShadow: "0px 3.43px 3.43px 0px #00000040",
  };

  // TODO: use theme styles
  const primaryStyles: SxProps<Theme> = {
    backgroundColor: "#0AFFF4",
    color: "#000000",
    // TODO: Figure out hover style -- either by updating the theme or by addressing here
  };

  const secondaryStyles: SxProps<Theme> = {
    backgroundColor: "#FFFFFF",
    color: "#7030A0",
    borderColor: "#7030A0",
  };

  return (
    <MuiButton
      startIcon={startIcon}
      variant={isPrimary ? "contained" : "outlined"}
      onClick={onClick}
      sx={[styles, isPrimary && primaryStyles, isSecondary && secondaryStyles, sx as any]}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

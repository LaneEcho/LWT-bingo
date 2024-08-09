import React from 'react';

import { FunctionComponent } from 'react';
import { Button as MuiButton, SxProps, Theme } from '@mui/material';

interface ButtonProps {
  variant: 'primary' | 'secondary-dark' | 'secondary' | 'primary-light';
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  darkMode?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  variant,
  children,
  startIcon,
  sx,
  onClick,
  disabled,
  darkMode,
}) => {

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const primaryBackGroundColor = !darkMode ? '#E11774' : '#0AFFF4';
  const primaryColor = !darkMode ? '#FFFFFF' : '#000000';
  const secondaryBackgroundColor = !darkMode ? '#FFFFFF' : '#000000';
  const secondaryColor = !darkMode ? '#E11774' : '#0AFFF4';

  
  const styles: SxProps<Theme> = {
    margin: '16px 8px',
    borderRadius: '30px',
    // boxShadow: '0px 3.43px 3.43px 0px #00000040',
  };

  // TODO: use theme styles
  const primaryStyles: SxProps<Theme> = {
    backgroundColor: primaryBackGroundColor,
    color: primaryColor,
    borderColor: primaryColor,
    boxShadow: 'none',
    // TODO: Figure out hover style -- either by updating the theme or by addressing here
  };

  const secondaryStyles: SxProps<Theme> = {
    backgroundColor: secondaryBackgroundColor,
    color: secondaryColor,
    borderColor: secondaryColor,
    boxShadow: 'none',
  };


  console.log(variant,darkMode,!darkMode,primaryBackGroundColor,primaryColor,primaryStyles,secondaryBackgroundColor,secondaryColor,secondaryStyles)

  return (
    <MuiButton
      startIcon={startIcon}
      variant={isPrimary ? 'contained' : 'outlined'}
      onClick={onClick}
      disabled={disabled}
      sx={[
        styles,
        isPrimary && primaryStyles,
        isSecondary && secondaryStyles,
        sx as any,
      ]}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

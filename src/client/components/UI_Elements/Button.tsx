import React from 'react';

import { FunctionComponent } from 'react';
import { Button as MuiButton, SxProps, Theme, useTheme } from '@mui/material';

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

  const theme = useTheme();

  const styles: SxProps<Theme> = {
    margin: '5px 8px',
    borderRadius: '30px',
    // boxShadow: '0px 3.43px 3.43px 0px #00000040',
  };

  const primaryStyles: SxProps<Theme> = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
    boxShadow: 'none',
    // TODO: Figure out hover style -- either by updating the theme or by addressing here
  };

  const secondaryStyles: SxProps<Theme> = {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.secondary.main,
    boxShadow: 'none',
  };

  // TODO: Add other styles

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

import React from 'react';

import { FunctionComponent } from 'react';
import { Button as MuiButton, SxProps, Theme, useTheme } from '@mui/material';

type ButtonType = 'button' | 'submit' | 'reset';

interface BaseProps {
  variant: 'primary' | 'secondary-dark' | 'secondary' | 'primary-light';
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

interface ButtonAsButtonProps extends BaseProps {
  component?: 'button';
  type?: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface ButtonAsLinkProps extends BaseProps {
  component: 'a';
  href: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button: FunctionComponent<ButtonProps> = ({
  variant,
  children,
  startIcon,
  sx,
  disabled,
  ...rest
}) => {
  const isPrimary = variant === 'primary';
  const isPrimaryLight = variant === 'primary-light';
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
    borderColor: theme.palette.secondary.contrastText,
    boxShadow: 'none',
  };

  const primaryLightStyles: SxProps<Theme> = {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    boxShadow: 'none',
  };

  // TODO: Add other styles

  return (
    <MuiButton
      startIcon={startIcon}
      variant={isPrimary ? 'contained' : 'outlined'}
      disabled={disabled}
      sx={[
        styles,
        isPrimary && primaryStyles,
        isPrimaryLight && primaryLightStyles,
        isSecondary && secondaryStyles,
        sx as any,
      ]}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

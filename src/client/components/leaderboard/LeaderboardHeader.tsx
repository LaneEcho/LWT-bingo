import React, { FunctionComponent } from 'react';
import { Typography, useTheme } from '@mui/material';

interface LeaderboardHeaderProps {
  label: string;
}

const LeaderboardHeader: FunctionComponent<LeaderboardHeaderProps> = ({
  label,
}) => {
  const theme = useTheme();
  return (
    <Typography
      color={
        theme.palette.mode === 'dark'
          ? theme.palette.primaryIceBlue.main // dark mode
          : theme.palette.primaryPink.main // light mode
      }
      align="center"
      gutterBottom={true}
      variant="body1"
      fontWeight={'bold'}
      fontStyle={'italic'}
    >
      {label}
    </Typography>
  );
};

export default LeaderboardHeader;

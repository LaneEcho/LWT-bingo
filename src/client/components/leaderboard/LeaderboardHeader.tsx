import React, { FunctionComponent } from 'react';
import { Typography, useTheme } from '@mui/material';

interface LeaderboardHeaderProps {
  label: string;
  color?: 'primary' | 'secondary';
}

const LeaderboardHeader: FunctionComponent<LeaderboardHeaderProps> = ({
  label,
  color = 'secondary',
}) => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontStyle: 'italic',
        color:
          color === 'secondary'
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
        textAlign: 'center',
      }}
    >
      {label}
    </Typography>
  );
};

export default LeaderboardHeader;

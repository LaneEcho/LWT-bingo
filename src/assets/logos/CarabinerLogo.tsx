import React, { FunctionComponent } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import CarabinerLogoSVG from '../../../assets/svg/carabinerLogoSVG.svg';
import CarabinerLogoSmallSVG from '../../../assets/svg/carabinerLogoSmallSVG.svg';

interface CarabinerLogoProps {
  size?: 'small' | 'large';
}

const CarabinerLogo: FunctionComponent<CarabinerLogoProps> = ({ size }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(1),
      }}
    >
      {isMobile || size === 'large' ? (
        <CarabinerLogoSmallSVG />
      ) : (
        <CarabinerLogoSVG />
      )}
    </div>
  );
};

export default CarabinerLogo;

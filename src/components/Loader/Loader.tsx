import { Typography } from '@mui/material';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Typography
      component="div"
      data-testid="loader"
      sx={{
        position: 'fixed',
        zIndex: 1200,
        top: 0,
        left: 0,
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      <Oval
        height={80}
        width={80}
        color="#4caefe"
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#fce498"
        strokeWidth={6}
        strokeWidthSecondary={4}
      />
    </Typography>
  );
};

export default Loader;

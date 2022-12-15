import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { convertToCelsius } from '../../utils/helpers';
import { ForecastData } from '../../types';

interface MainInfoProps {
  weather: ForecastData | null;
}

const MainInfo: FC<MainInfoProps> = ({ weather }) => {
  return (
    <Grid sx={{ padding: '20px' }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid container alignItems="center">
          <Typography variant="h3">{weather?.city?.name}</Typography>
        </Grid>
        <img
          src={
            weather
              ? `http://openweathermap.org/img/wn/${weather?.list[0]?.weather[0]?.icon}.png`
              : ''
          }
          alt=""
        />
      </Grid>
      <Typography sx={{ mt: '15px' }}>
        {new Date().toLocaleString('en-US', { weekday: 'long' })},{' '}
        {new Date().toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </Typography>
      <Grid container direction="column">
        <Typography variant="h3" sx={{ mt: '30px' }}>
          {convertToCelsius(weather?.list[0]?.main?.temp || 0)}
          <sup>&#8451;</sup>
        </Typography>
        <Typography sx={{ fontSize: '18px' }}>
          {String(
            (weather?.list[0]?.weather[0]?.description[0].toUpperCase() || '') +
              (weather?.list[0]?.weather[0]?.description.slice(1) || ''),
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MainInfo;

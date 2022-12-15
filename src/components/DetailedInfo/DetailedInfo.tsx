import { FC } from 'react';
import { Grid, Divider } from '@mui/material';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { convertToCelsius } from '../../utils/helpers';
import { ForecastData } from '../../types';

dayjs.extend(localizedFormat);

interface DetailedInfoProps {
  weather: ForecastData | null;
}

const DetailedInfo: FC<DetailedInfoProps> = ({ weather }) => {
  return (
    <Grid sx={{ padding: '20px' }}>
      <Grid container direction="column">
        <Grid container justifyContent="space-between">
          <Grid item>Humidity</Grid>
          <Grid item>{weather?.list[0]?.main?.humidity}%</Grid>
        </Grid>
        <Divider />
        <Grid container justifyContent="space-between" sx={{ mt: '10px' }}>
          <Grid item>Pressure</Grid>
          <Grid item>{weather?.list[0]?.main?.pressure}mb</Grid>
        </Grid>
        <Divider />
        <Grid container justifyContent="space-between" sx={{ mt: '10px' }}>
          <Grid item>Wind Speed</Grid>
          <Grid item>{weather?.list[0]?.wind?.speed}m/s</Grid>
        </Grid>
        <Divider />
        <Grid container justifyContent="space-between" sx={{ mt: '10px' }}>
          <Grid item>High Temperature</Grid>
          <Grid item>
            {convertToCelsius(weather?.list[0]?.main?.temp_max || 0)}
            <sup>&#8451;</sup>
          </Grid>
        </Grid>
        <Divider />
        <Grid container justifyContent="space-between" sx={{ mt: '10px' }}>
          <Grid item>Low Temperature</Grid>
          <Grid item>
            {convertToCelsius(weather?.list[0]?.main?.temp_min || 0)}
            <sup>&#8451;</sup>
          </Grid>
        </Grid>
        <Divider />
        <Grid container justifyContent="space-between" sx={{ mt: '10px' }}>
          <Grid item>Cloudly</Grid>
          <Grid item>{weather?.list[0]?.clouds?.all}%</Grid>
        </Grid>
        <Divider />
        <Grid container justifyContent="space-between" sx={{ mt: '10px' }}>
          <Grid item>Sunrise</Grid>
          <Grid item>
            {String(dayjs.unix(Number(weather?.city?.sunrise)).format('LT'))}
          </Grid>
        </Grid>
        <Divider />
        <Grid container justifyContent="space-between" sx={{ mt: '10px' }}>
          <Grid item>Sunset</Grid>
          <Grid item>
            {String(dayjs.unix(Number(weather?.city?.sunset)).format('LT'))}
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default DetailedInfo;

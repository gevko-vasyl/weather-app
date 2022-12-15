import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Divider,
  Typography,
  Card,
  IconButton,
  CardContent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import { WeatherData } from '../../types';
import { useAppActions } from '../../hooks/useActions';
import { convertToCelsius } from '../../utils/helpers';
import axios from 'axios';

interface CityItemProps {
  city: WeatherData;
}

const CityItem: FC<CityItemProps> = ({ city }) => {
  const [cityState, setCityState] = useState<WeatherData>(city);
  const { removeCity } = useAppActions();

  const updateCity = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.REACT_APP_API_KEY}`,
      );

      setCityState(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [city.name]);

  return (
    <Grid>
      <Card
        sx={{
          position: 'relative',
          mt: '15px',
          mr: '15px',
          maxWidth: 275,
          minWidth: 220,
          backgroundColor: '#fce498',
        }}
      >
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Link
              to={`details/${cityState?.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Typography variant="h4" color="text.secondary">
                {cityState?.name}
              </Typography>
            </Link>

            <IconButton
              sx={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => removeCity(cityState?.id)}
            >
              <ClearIcon />
            </IconButton>
          </Grid>
          <Link
            to={`details/${city?.id}`}
            style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <img
                src={`http://openweathermap.org/img/wn/${cityState?.weather[0]?.icon}.png`}
                alt=""
              />
              <Typography>{cityState?.weather[0]?.main}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h5" color="text.secondary">
                {convertToCelsius(city?.main?.temp)}
                <sup>&#8451;</sup>
              </Typography>
            </Grid>
          </Link>
          <Grid container alignItems="center" sx={{ mt: '15px' }}>
            <Typography variant="body2" sx={{ mr: 1.5 }}>
              Wind:
            </Typography>
            <Typography>{city?.wind?.speed}m/s</Typography>
            <IconButton sx={{ ml: 'auto' }} onClick={updateCity}>
              <RefreshIcon />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CityItem;

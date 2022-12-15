import { FC } from 'react';
import { Grid } from '@mui/material';
import CityItem from '../CityItem/CityItem';
import { WeatherData } from '../../types';

interface CitiesListProps {
  cities: WeatherData[];
}

const CitiesList: FC<CitiesListProps> = ({ cities }) => {
  return (
    <Grid container>
      {cities.map(city => (
        <CityItem key={city.id} city={city} />
      ))}
    </Grid>
  );
};

export default CitiesList;

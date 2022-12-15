import { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Card, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import MainInfo from '../components/MainInfo/MainInfo';
import DetailedInfo from '../components/DetailedInfo/DetailedInfo';
import ForecastCarousel from '../components/ForecastCarousel/ForecastCarousel';
import Loader from '../components/Loader/Loader';
import { useAppDispatch } from '../hooks/useActions';
import { fetchCityDetailsAndForecast } from '../store/thunks';
import { useTypedSelector } from '../hooks/useTypedSelector';

dayjs.extend(localizedFormat);

const WeatherDetailedPage: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { cityDetails, error, loading } = useTypedSelector(state => state);

  useEffect(() => {
    dispatch(fetchCityDetailsAndForecast(params.id || ''));
  }, [dispatch, params.id]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Grid sx={{ padding: '30px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="warning" sx={{ mb: '20px' }}>
          Back to list
        </Button>
      </Link>
      {!error ? (
        <Grid container>
          <Card sx={{ backgroundColor: '#fce498', padding: '40px' }}>
            <Grid container justifyContent="center">
              <Grid container sx={{ width: '30%' }}>
                <MainInfo weather={cityDetails} />
              </Grid>
              <Grid container direction="column" sx={{ width: '70%' }}>
                <DetailedInfo weather={cityDetails} />
                <ForecastCarousel weather={cityDetails} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ) : (
        <Typography variant="h1">Something went wrong</Typography>
      )}
    </Grid>
  );
};

export default WeatherDetailedPage;

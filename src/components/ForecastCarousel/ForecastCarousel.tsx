import { FC } from 'react';
import { Grid, Typography, Card } from '@mui/material';
import Carousel from 'nuka-carousel';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { convertToCelsius } from '../../utils/helpers';
import { ForecastData, ForecastDetails } from '../../types';

dayjs.extend(localizedFormat);

interface ForecastCarouselProps {
  weather: ForecastData | null;
}

const ForecastCarousel: FC<ForecastCarouselProps> = ({ weather }) => {
  return (
    <Grid sx={{ width: '100%', padding: '0px 30px 20px 30px' }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Forecast
      </Typography>
      <Carousel
        wrapAround={false}
        slidesToShow={6}
        cellSpacing={10}
        defaultControlsConfig={{
          pagingDotsStyle: { display: 'none' },
          nextButtonStyle: { display: 'none' },
          prevButtonStyle: { display: 'none' },
        }}
      >
        {weather?.list?.map((el: ForecastDetails, i: number) => (
          <Card key={i} sx={{ padding: '10px', backgroundColor: '#2596be' }}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <img
                    src={
                      el
                        ? `https://openweathermap.org/img/wn/${el?.weather[0]?.icon}.png`
                        : ''
                    }
                    alt=""
                  />
                  <div>
                    {convertToCelsius(el?.main?.temp)}
                    <sup>&#8451;</sup>
                  </div>
                </Grid>

                <Grid item>
                  {String(dayjs.unix(Number(el?.dt)).format('ddd'))},{' '}
                  {String(dayjs.unix(Number(el?.dt)).format('LT'))}
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Carousel>
    </Grid>
  );
};

export default ForecastCarousel;

import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import DetailedInfo from './DetailedInfo';

afterEach(cleanup);

const mock = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1671040800,
      main: {
        temp: 268.49,
        feels_like: 264.66,
        temp_min: 268.49,
        temp_max: 268.76,
        pressure: 989,
        sea_level: 989,
        grnd_level: 1004,
        humidity: 83,
        temp_kf: -0.27,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 84,
      },
      wind: {
        speed: 2.46,
        deg: 154,
        gust: 5.49,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'n',
      },
      dt_txt: '2022-12-14 18:00:00',
    },
    {
      dt: 1671051600,
      main: {
        temp: 268.72,
        feels_like: 263.61,
        temp_min: 268.72,
        temp_max: 269.18,
        pressure: 999,
        sea_level: 999,
        grnd_level: 1003,
        humidity: 82,
        temp_kf: -0.46,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 89,
      },
      wind: {
        speed: 3.77,
        deg: 135,
        gust: 10.16,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'n',
      },
      dt_txt: '2022-12-14 21:00:00',
    },
    {
      dt: 1671062400,
      main: {
        temp: 269.77,
        feels_like: 263.63,
        temp_min: 269.77,
        temp_max: 270.41,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 1002,
        humidity: 79,
        temp_kf: -0.64,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 95,
      },
      wind: {
        speed: 5.61,
        deg: 135,
        gust: 13.13,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'n',
      },
      dt_txt: '2022-12-15 00:00:00',
    },
  ],
  city: {
    id: 703448,
    name: 'Kyiv',
    coord: {
      lat: 50.4333,
      lon: 30.5167,
    },
    country: 'UA',
    population: 0,
    timezone: 7200,
    sunrise: 1670997059,
    sunset: 1671026049,
  },
};

it('should render DetailedInfo with given data', () => {
  render(<DetailedInfo weather={mock} />);
  const humidity = screen.getByText(`${mock.list[0].main.humidity}%`);
  const pressure = screen.getByText(`${mock.list[0].main.pressure}mb`);
  const windSpeed = screen.getByText(`${mock.list[0].wind.speed}m/s`);
  const clouds = screen.getByText(`${mock.list[0].clouds.all}%`);

  expect(humidity).toBeTruthy();
  expect(pressure).toBeTruthy();
  expect(windSpeed).toBeTruthy();
  expect(clouds).toBeTruthy();
});

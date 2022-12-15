import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { convertToCelsius } from '../../utils/helpers';
import { store } from '../../store';
import CityItem from './CityItem';

afterEach(cleanup);

const mock = {
  base: '',
  clouds: {
    all: 12,
  },
  cod: 12,
  coord: {
    lon: 12,
    lat: 12,
  },
  dt: 12,
  id: 12,
  main: {
    feels_like: 12,
    humidity: 12,
    pressure: 12,
    temp: 536,
    temp_max: 12,
    temp_min: 12,
  },
  name: 'Kyiv',
  sys: {
    country: '',
    id: 12,
    sunrise: 12,
    sunset: 12,
    type: 12,
  },
  timezone: 12,

  visibility: 12,
  weather: [
    {
      icon: '',
      description: 'Very sunny',
      id: 1,
      main: 'sunny',
    },
  ],
  wind: {
    speed: 12,
    deg: 12,
  },
};

it('should render CityItem with given data', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CityItem city={mock} />
      </BrowserRouter>
    </Provider>,
  );
  const Title = screen.getByText(mock.name);
  const WeatherDescription = screen.getByText(mock.weather[0].main);
  const Temperature = screen.getByText(convertToCelsius(mock.main.temp));

  expect(Title).toBeTruthy();
  expect(WeatherDescription).toBeTruthy();
  expect(Temperature).toBeTruthy();
});

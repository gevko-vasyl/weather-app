import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import CitiesList from './CitiesList';

afterEach(cleanup);

const mocks = [
  {
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
      temp: 12,
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
        description: '',
        id: 1,
        main: '',
      },
    ],
    wind: {
      speed: 12,
      deg: 12,
    },
  },
  {
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
      temp: 12,
      temp_max: 12,
      temp_min: 12,
    },
    name: 'Paris',
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
        description: '',
        id: 1,
        main: '',
      },
    ],
    wind: {
      speed: 12,
      deg: 12,
    },
  },
];

it('should render CitiesList with given items', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CitiesList cities={mocks} />
      </BrowserRouter>
    </Provider>,
  );
  const firstItem = screen.getByText(mocks[0].name);
  const secondItem = screen.getByText(mocks[1].name);

  expect(firstItem).toBeTruthy();
  expect(secondItem).toBeTruthy();
});

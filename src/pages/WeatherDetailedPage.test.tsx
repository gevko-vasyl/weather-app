import '@testing-library/jest-dom';
import { render, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import WeatherDetailedPage from './WeatherDetailedPage';

afterEach(cleanup);

jest.mock('../components/MainInfo/MainInfo', () => () => <div>Main info</div>);
jest.mock('../components/DetailedInfo/DetailedInfo', () => () => (
  <div>Detailed Info</div>
));
jest.mock('../components/ForecastCarousel/ForecastCarousel', () => () => (
  <div>Forecast Carousel</div>
));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 703448,
  }),
}));

it('should render WeatherDetailedPage', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <WeatherDetailedPage />;
      </BrowserRouter>
    </Provider>,
  );

  await waitFor(() => expect(container.textContent).toMatch('Main info'));
  await waitFor(() => expect(container.textContent).toMatch('Detailed Info'));
  await waitFor(() =>
    expect(container.textContent).toMatch('Forecast Carousel'),
  );
});

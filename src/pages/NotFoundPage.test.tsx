import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

afterEach(cleanup);

it('should render NotFoundPage', () => {
  render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>,
  );
  const humidity = screen.getByText('Page not found');
  const pressure = screen.getByText(
    `We're sorry, the page you requsted could not be found. Plase go back to homepage.`,
  );

  expect(humidity).toBeTruthy();
  expect(pressure).toBeTruthy();
});

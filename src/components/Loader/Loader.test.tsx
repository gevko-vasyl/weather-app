import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import Loader from './Loader';

afterEach(cleanup);

it('should render Loader', () => {
  render(<Loader />);
  const loader = screen.getByTestId('loader');

  expect(loader).toBeTruthy();
});

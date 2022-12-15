import '@testing-library/jest-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import AddCityDialog from './AddCityDialog';

afterEach(cleanup);

it('should render hidden AddCityDialog and icon to open it', () => {
  render(
    <Provider store={store}>
      <AddCityDialog />
    </Provider>,
  );
  const icon = screen.getByTestId('AddIcon');
  expect(icon).toBeTruthy();
});

it('should render open AddCityDialog', () => {
  render(
    <Provider store={store}>
      <AddCityDialog />
    </Provider>,
  );
  const icon = screen.getByTestId('AddIcon');
  fireEvent.click(icon);
  const confirmBtn = screen.getByText('Confirm');
  const title = screen.getByText(
    'To add city to list, type city name. And confirm your changes.',
  );

  expect(title).toBeTruthy();
  expect(confirmBtn).toBeTruthy();
  expect(confirmBtn).toHaveAttribute('disabled');
});

it('should render AddCityDialog, disable confirm button with empty input and active with filled', () => {
  render(
    <Provider store={store}>
      <AddCityDialog />
    </Provider>,
  );
  const icon = screen.getByTestId('AddIcon');
  fireEvent.click(icon);
  const input = screen.getByRole('textbox');
  const confirmBtn = screen.getByText('Confirm');
  fireEvent.change(input, { target: { value: 'Kyiv' } });

  expect(input).toHaveValue('Kyiv');
  expect(confirmBtn).not.toHaveAttribute('disabled');
});

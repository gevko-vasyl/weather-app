import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForecastData, WeatherData } from '../../types';
import { fetchCitiesWeather, fetchCityDetailsAndForecast } from '../thunks';

interface IAppState {
  cities: WeatherData[];
  cityDetails: ForecastData | null;
  loading: boolean;
  error: string;
}

export const initialState: IAppState = {
  cities: [],
  cityDetails: null,
  loading: false,
  error: '',
};

const appSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<WeatherData>) => {
      state.cities = [...state.cities, action.payload];
      state.error = '';
    },
    removeCity: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter(el => el.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCitiesWeather.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCitiesWeather.fulfilled, (state, { payload }) => {
      if (!state.cities.length) {
        state.cities = payload.list;
      }
      state.loading = false;
      state.error = '';
    });
    builder.addCase(fetchCitiesWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(fetchCityDetailsAndForecast.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchCityDetailsAndForecast.fulfilled,
      (state, { payload }) => {
        state.cityDetails = payload;
        state.loading = false;
        state.error = '';
      },
    );
    builder.addCase(fetchCityDetailsAndForecast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export const fetchCitiesWeather = createAsyncThunk(
  'app/fetchCitiesWeather',
  async (ids: number[], thunkAPI) => {
    try {
      const citiesIdArrToString = ids.join(',');
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/group?id=${citiesIdArrToString}&appid=${process.env.REACT_APP_API_KEY}`,
      );

      return response.data;
    } catch (err) {
      let message;
      if (err instanceof AxiosError) {
        message = err.response;
      } else {
        message = String(err);
      }
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchCityDetailsAndForecast = createAsyncThunk(
  'app/fetchCityDetailsAndForecast',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${process.env.REACT_APP_API_KEY}`,
      );

      return response.data;
    } catch (err) {
      let message;
      if (err instanceof AxiosError) {
        message = err.response;
      } else {
        message = String(err);
      }
      return thunkAPI.rejectWithValue(message);
    }
  },
);

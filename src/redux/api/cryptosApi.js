import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const getCryptos = createAsyncThunk(
  'cryptos/getCryptos',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/assets');

      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCoinInfo = createAsyncThunk(
  'cryptos/getCoinInfo',
  async (slug, thunkAPI) => {
    try {
      const result = {};

      const coinInfo = await api.get(`/assets/${slug}`);
      result.info = coinInfo.data.data;

      const coinHistory = await api.get(`/assets/${slug}/history?interval=d1`);
      result.history = coinHistory.data.data;

      return thunkAPI.fulfillWithValue(result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

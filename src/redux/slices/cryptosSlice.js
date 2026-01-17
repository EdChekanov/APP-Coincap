import { createSlice } from '@reduxjs/toolkit';
import { getCryptos, getCoinInfo } from '../api/cryptosApi';

const initialState = {
  coinList: [],
  currentCoin: null,
  loading: false,
  error: null,
};

const cryptosSlice = createSlice({
  name: 'cryptos',
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCryptos.fulfilled, (state, action) => {
        state.coinList = action.payload;
      })
      .addCase(getCoinInfo.fulfilled, (state, action) => {
        state.currentCoin = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
  selectors: {
    selectCoinList: (state) => state.coinList,
    selectCurrentCoin: (state) => state.currentCoin,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const { selectCoinList, selectCurrentCoin, selectLoading, selectError } =
  cryptosSlice.selectors;
// export const {} = cryptosSlice.actions;
export default cryptosSlice.reducer;

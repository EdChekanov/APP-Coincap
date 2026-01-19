import { createSlice } from '@reduxjs/toolkit';

const COUNT_OF_PERCENT = 100;

const initialState = {
  coinList: [],
  total: 0,
  buyTotal: 0,
  pnl: '0.00',
  dif: 0,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCoinToPortfolio(state, action) {
      const coin = state.coinList.find(
        (item) => item.coinId === action.payload.coinId,
      );
      if (coin) {
        coin.count += action.payload.count;
      } else {
        state.coinList.push({
          ...action.payload,
          currentPrice: action.payload.buyPrice,
        });
      }
    },
    deleteCoinFromPortfolio(state, action) {
      state.coinList = state.coinList.filter(
        (item) => item.coinId !== action.payload,
      );
    },
    setCoinList(state, action) {
      state.coinList = action.payload;
    },
    refreshTotals(state) {
      state.total = state.coinList.reduce(
        (a, b) => a + b.currentPrice * b.count,
        0,
      );
      state.buyTotal = state.coinList.reduce(
        (a, b) => a + b.buyPrice * b.count,
        0,
      );
      state.pnl = (
        COUNT_OF_PERCENT - (state.buyTotal * COUNT_OF_PERCENT) / state.total ||
        0
      ).toFixed(2);
      state.dif = (state.total - state.buyTotal).toFixed(2);
    },
  },
  selectors: {
    selectPortfolioCoinList: (state) => state.coinList,
    selectPortfolioTotal: (state) => state.total,
    selectPortfolioPnL: (state) => state.pnl,
    selectPortfolioDif: (state) => state.dif,
  },
});

export const {
  selectPortfolioCoinList,
  selectPortfolioTotal,
  selectPortfolioPnL,
  selectPortfolioDif,
} = portfolioSlice.selectors;
export const {
  addCoinToPortfolio,
  deleteCoinFromPortfolio,
  setCoinList,
  refreshTotals,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;

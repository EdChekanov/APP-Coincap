import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  addCoinToPortfolio,
  deleteCoinFromPortfolio,
  refreshTotals,
  setCoinList,
} from '../slices/portfolioSlice';
import { getCryptos } from '../api/cryptosApi';

export const portfolioMiddleware = createListenerMiddleware();

portfolioMiddleware.startListening({
  actionCreator: getCryptos.fulfilled,
  effect: (_, listenerApi) => {
    const cryptos = listenerApi.getState().cryptos.coinList;

    let saved = JSON.parse(localStorage.getItem('portfolio')) || [];
    saved = saved.map((item) => {
      const coinInfo = cryptos.find((el) => el.id === item.coinId);
      return coinInfo ? { ...item, currentPrice: coinInfo.priceUsd } : item;
    });

    listenerApi.dispatch(setCoinList(saved));
  },
});

portfolioMiddleware.startListening({
  matcher: isAnyOf(addCoinToPortfolio, deleteCoinFromPortfolio, setCoinList),
  effect: (_, listenerApi) => {
    listenerApi.dispatch(refreshTotals());
    const portfolio = listenerApi.getState().portfolio.coinList;

    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  },
});

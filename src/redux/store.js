import { combineReducers, configureStore } from '@reduxjs/toolkit';

import cryptosReducer from './slices/cryptosSlice';
import uiReducer from './slices/uiSlice';
import portfolioReducer from './slices/portfolioSlice';
import { portfolioMiddleware } from './middleware/portfolioMiddleware';

const store = configureStore({
  reducer: combineReducers({
    cryptos: cryptosReducer,
    ui: uiReducer,
    portfolio: portfolioReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(portfolioMiddleware.middleware),
});

export default store;

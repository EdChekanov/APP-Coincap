import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addModal: {
    isVisible: false,
    coinName: null,
    coinId: null,
    coinPrice: null,
  },
  portfolioModal: {
    isVisible: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAddModal(state, action) {
      state.addModal.isVisible = true;
      state.addModal.coinName = action.payload.coinName;
      state.addModal.coinId = action.payload.coinId;
      state.addModal.coinPrice = action.payload.coinPrice;
    },
    closeAddModal(state) {
      state.addModal.isVisible = false;
    },
    openPortfolioModal(state) {
      state.portfolioModal.isVisible = true;
    },
    closePortfolioModal(state) {
      state.portfolioModal.isVisible = false;
    },
  },
  selectors: {
    selectIsAddOpen: (state) => state.addModal.isVisible,
    selectAddModalCoinName: (state) => state.addModal.coinName,
    selectAddModalCoinId: (state) => state.addModal.coinId,
    selectAddModalCoinPrice: (state) => state.addModal.coinPrice,
    selectIsPortfolioOpen: (state) => state.portfolioModal.isVisible,
  },
});

export const {
  selectIsAddOpen,
  selectAddModalCoinName,
  selectAddModalCoinId,
  selectAddModalCoinPrice,
  selectIsPortfolioOpen,
} = uiSlice.selectors;
export const {
  openAddModal,
  closeAddModal,
  openPortfolioModal,
  closePortfolioModal,
} = uiSlice.actions;
export default uiSlice.reducer;

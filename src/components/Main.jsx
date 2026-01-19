import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import Header from './ui/Header';
import AddModal from './ui/AddModal';
import PortfolioModal from './ui/PortfolioModal';

import { getCryptos } from '../redux/api/cryptosApi';
import { selectLoading, selectError } from '../redux/slices/cryptosSlice';

const Main = () => {
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCryptos());
  }, [dispatch]);

  if (error) {
    return <h2>Ошибка: {error.response.data.message}</h2>;
  }

  return (
    <>
      {loading && (
        <div className="spinner-overlay">
          <Spin size="large" />
        </div>
      )}
      <div className="wrapper">
        <Header />
        <Outlet />
        <AddModal />
        <PortfolioModal />
      </div>
    </>
  );
};

export default Main;

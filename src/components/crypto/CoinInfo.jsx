import HeadInfo from './info/HeadInfo';
import AddSection from '../ui/AddSection';
import AdditionalInfo from './info/AdditionalInfo';
import Chart from './info/Chart';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCoin } from '../../redux/slices/cryptosSlice';
import { useEffect } from 'react';
import { getCoinInfo } from '../../redux/api/cryptosApi';
import { useNavigate, useParams } from 'react-router';
import { Spin } from 'antd';

const CoinInfo = () => {
  const currentCoin = useSelector(selectCurrentCoin);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoinInfo(params.slug));
  }, [dispatch, params]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      {!currentCoin ? (
        <div className="spinner-overlay">
          <Spin size="large" />
        </div>
      ) : (
        <div className="coin-info">
          <HeadInfo {...currentCoin?.info} />
          <AddSection {...currentCoin?.info} />
          <AdditionalInfo {...currentCoin?.info} />
          <Chart historyData={currentCoin?.history} />
          <button className="back-btn">
            <img src="/back.svg" alt="back" onClick={handleBack} />
          </button>
        </div>
      )}
    </>
  );
};

export default CoinInfo;

import { useDispatch, useSelector } from 'react-redux';
import { selectCoinList } from '../../redux/slices/cryptosSlice';
import { formatPrice } from '../../utils/formatPrice';
import { formatInt } from '../../utils/formatInt';
import { useNavigate } from 'react-router';
import { openPortfolioModal } from '../../redux/slices/uiSlice';
import {
  selectPortfolioDif,
  selectPortfolioPnL,
  selectPortfolioTotal,
} from '../../redux/slices/portfolioSlice';

const Header = () => {
  const cryptos = useSelector(selectCoinList);
  const total = useSelector(selectPortfolioTotal);
  const pnl = useSelector(selectPortfolioPnL);
  let dif = useSelector(selectPortfolioDif);
  dif = dif >= 0 ? `+${formatInt(dif)}` : `${formatInt(dif)}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const btnHandler = () => {
    dispatch(openPortfolioModal());
  };

  return (
    <header className="header">
      <div className="popular-crypto">
        <p className="title">Популярные криптовалюты:</p>
        <ul className="crypto-items">
          {cryptos.slice(0, 3).map((coin) => {
            return (
              <li
                key={coin.id}
                className="crypto-item"
                onClick={() => navigate(`/${coin.id}`)}
              >
                <p className="name">{coin.name}</p>
                <p className="price">${formatPrice(coin.priceUsd)}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="portfolio" onClick={btnHandler}>
        <img className="portfolio-img" src="/portfolio.svg" alt="Portfolio" />
        <div className="portfolio-info">
          <p>
            Итого:{' '}
            <span>
              {formatInt(total)} {+dif ? dif : ''} ({pnl}%) USD
            </span>
          </p>
        </div>
      </button>
    </header>
  );
};

export default Header;

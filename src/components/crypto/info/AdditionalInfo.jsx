import { formatInt } from '../../../utils/formatInt';

const AdditionalInfo = ({
  marketCapUsd,
  supply,
  maxSupply,
  volumeUsd24Hr,
  vwap24Hr,
  explorer,
}) => {
  return (
    <div className="additional-info">
      <ul className="list">
        <li className="item">
          <p className="key">Рыночная капитализация</p>
          <p className="value">{formatInt(marketCapUsd)} $</p>
        </li>
        <li className="item">
          <p className="key">Циркулирующее предложение</p>
          <p className="value">{formatInt(supply)}</p>
        </li>
        <li className="item">
          <p className="key">Максимальное предложение</p>
          <p className="value">{formatInt(maxSupply) || 'Не ограничено'}</p>
        </li>
        <li className="item">
          <p className="key">Объем торгов за 24 часа</p>
          <p className="value">{formatInt(volumeUsd24Hr)} $</p>
        </li>
        <li className="item">
          <p className="key">Объемно-взвешенная средняя цена за 24ч</p>
          <p className="value">{formatInt(vwap24Hr)} $</p>
        </li>
        <li className="item">
          <p className="key">Блокчейн-обозреватель</p>
          <a className="value" href={explorer} target="_blank">
            {explorer}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdditionalInfo;

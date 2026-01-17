const headInfo = ({ name, symbol, priceUsd, changePercent24Hr }) => {
  return (
    <div className="head-info">
      <p className="name">
        {name} <span className="symbol">({symbol})</span>
      </p>
      <p className="price">
        ${parseFloat(priceUsd).toFixed(2)}
        <span
          className="change"
          style={{ color: changePercent24Hr > 0 ? 'green' : 'red' }}
        >
          {changePercent24Hr > 0 ? <>&#9650;</> : <>&#9660;</>}
          {parseFloat(changePercent24Hr).toFixed(2)}% (24ч.)
        </span>
      </p>
    </div>
  );
};

export default headInfo;

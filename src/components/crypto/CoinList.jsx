import { useNavigate } from 'react-router-dom';
import { Table, Tag } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { formatInt } from '../../utils/formatInt';
import { formatPrice } from '../../utils/formatPrice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoinList } from '../../redux/slices/cryptosSlice';
import { openAddModal } from '../../redux/slices/uiSlice';

const CoinList = () => {
  const cryptos = useSelector(selectCoinList);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToCoinInfo = (record) => {
    navigate(`/${record.key}`);
  };

  const addHandler = (e, coinInfo) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(openAddModal(coinInfo));
  };

  const columns = [
    {
      title: '№',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      sorter: (a, b) => a.rank - b.rank,
    },
    {
      title: 'Монета',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="table-item-name">
          <span className="symbol">{record.symbol}</span>
          <span className="name">{text}</span>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${formatPrice(text)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Изменение',
      dataIndex: 'change',
      key: 'change',
      render: (text, record) => (
        <Tag color={record.change > 0 ? 'green' : 'red'}>
          {record.change > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
          {formatPrice(text)}%
        </Tag>
      ),
      sorter: (a, b) => a.change - b.change,
    },
    {
      title: 'Рыночная капитализация',
      dataIndex: 'marketCap',
      key: 'marketCap',
      render: (text) => `$${formatInt(text)}`,
      sorter: (a, b) => a.marketCap - b.marketCap,
    },
    {
      title: 'Объём',
      dataIndex: 'volume',
      key: 'volume',
      render: (text) => `$${formatInt(text)}`,
      sorter: (a, b) => a.volume - b.volume,
    },
    {
      title: '',
      key: 'add-btn',
      width: 60,
      render: (record) => (
        <button
          className="add-btn"
          onClick={(e) =>
            addHandler(e, {
              coinId: record.key,
              coinName: record.name,
              coinPrice: record.price,
            })
          }
        >
          <img src="/add.svg" alt="add" width={20} height={20} />
        </button>
      ),
    },
  ];

  const dataSource = cryptos.map((item) => {
    return {
      key: item.id,
      rank: item.rank,
      name: item.name,
      symbol: item.symbol,
      price: item.priceUsd,
      change: item.changePercent24Hr,
      marketCap: item.marketCapUsd,
      volume: item.volumeUsd24Hr,
    };
  });

  return (
    <div className="coin-list">
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        loading={false}
        pagination={{ pageSize: 10, showTotal: (total) => `Всего: ${total}` }}
        onRow={(record) => ({
          onClick: () => navigateToCoinInfo(record),
          style: { cursor: 'pointer' },
        })}
      />
    </div>
  );
};

export default CoinList;

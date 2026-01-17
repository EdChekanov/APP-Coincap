import { Modal, Table } from 'antd';
import { formatPrice } from '../../utils/formatPrice';
import { useDispatch, useSelector } from 'react-redux';
import {
  closePortfolioModal,
  selectIsPortfolioOpen,
} from '../../redux/slices/uiSlice';
import {
  deleteCoinFromPortfolio,
  selectPortfolioCoinList,
  selectPortfolioTotal,
} from '../../redux/slices/portfolioSlice';

const PortfolioModal = () => {
  const visible = useSelector(selectIsPortfolioOpen);
  const coinList = useSelector(selectPortfolioCoinList);
  const total = useSelector(selectPortfolioTotal);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closePortfolioModal());
  };

  const btnHandler = (name) => {
    dispatch(deleteCoinFromPortfolio(name));
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'coinName',
      key: 'coinName',
      render: (text) => <span className="name">{text}</span>,
      sorter: (a, b) => a.coinName.localeCompare(b.coinName),
    },
    {
      title: 'Цена покупки',
      dataIndex: 'buyPrice',
      key: 'buyPrice',
      render: (text) => `$${formatPrice(text)}`,
      sorter: (a, b) => a.buyPrice - b.buyPrice,
    },
    {
      title: 'Цена ',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      render: (text) => `$${formatPrice(text)}`,
      sorter: (a, b) => a.currentPrice - b.currentPrice,
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      render: (text) => <span className="count">{text}</span>,
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: 'Итого',
      dataIndex: 'total',
      key: 'total',
      render: (_, record) => (
        <span className="total">
          {formatPrice(record.count * record.currentPrice)}
        </span>
      ),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: '',
      key: 'delete-btn',
      width: 60,
      render: (_, record) => (
        <button className="delete-btn" onClick={() => btnHandler(record.key)}>
          <img src="/del.svg" alt="del" width={20} height={20} />
        </button>
      ),
    },
  ];

  return (
    <Modal
      title={`Портфель`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
    >
      <div className="portfolio">
        <Table
          columns={columns}
          dataSource={coinList}
          size="small"
          pagination={false}
        />
        <p className="total">Итого: ${formatPrice(total)}</p>
      </div>
    </Modal>
  );
};

export default PortfolioModal;

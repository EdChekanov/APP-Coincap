import { Modal, InputNumber, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeAddModal,
  selectAddModalCoinId,
  selectAddModalCoinName,
  selectAddModalCoinPrice,
  selectIsAddOpen,
} from '../../redux/slices/uiSlice';
import { addCoinToPortfolio } from '../../redux/slices/portfolioSlice';

const AddModal = () => {
  const isVisible = useSelector(selectIsAddOpen);
  const coinName = useSelector(selectAddModalCoinName);
  const coinId = useSelector(selectAddModalCoinId);
  const coinPrice = useSelector(selectAddModalCoinPrice);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onAdd = (data) => {
    dispatch(
      addCoinToPortfolio({
        key: coinId,
        coinId: coinId,
        coinName: coinName,
        buyPrice: coinPrice,
        count: data.amount,
      })
    );
  };

  const onClose = () => {
    dispatch(closeAddModal());
    form.resetFields();
  };

  const onFinish = (values) => {
    onAdd(values);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={`Добавить ${coinName} в портфель`}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="amount"
          label="Количество"
          rules={[{ required: true, message: 'Введите количество' }]}
        >
          <InputNumber
            placeholder="0.00000000"
            min={0}
            step={0.00000001}
            size="large"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <div className="modal-btns">
          <Button onClick={onClose} size="large">
            Отмена
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            size="large"
          >
            Добавить в портфель
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddModal;

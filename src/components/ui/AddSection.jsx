import { InputNumber, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addCoinToPortfolio } from '../../redux/slices/portfolioSlice';

const AddSection = ({ name, id, priceUsd }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (values.amount) {
      dispatch(
        addCoinToPortfolio({
          key: id,
          coinId: id,
          coinName: name,
          buyPrice: priceUsd,
          count: values.amount,
        })
      );
    }
    form.resetFields();
  };

  return (
    <div className="add-section">
      <h3 className="title">Купить {name}:</h3>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="amount">
          <InputNumber
            placeholder="Введите количество"
            min={0}
            step={0.00000001}
            size="large"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          onClick={() => form.submit()}
          icon={<PlusOutlined />}
          size="small"
        >
          Добавить в портфель
        </Button>
      </Form>
    </div>
  );
};

export default AddSection;

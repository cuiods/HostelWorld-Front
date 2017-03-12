/**
 * Check out modal
 */
import React, { PropTypes } from 'react'
import { Form, Input, Select, Modal } from 'antd'
const FormItem = Form.Item;
const confirm = Modal.confirm;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};
const CheckOutModal = ({
  visible,
  item,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const form = getFieldsValue();
      const data = {
        id: item.id,
        memberId: form.memberId?Number(form.memberId):0,
        payway: form.payway
      };
      confirm({
        title: '确定付款吗?',
        onOk () {
          onOk(data);
        }
      })
    })
  }

  const modalOpts = {
    title: `退房处理`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='会员卡号：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('accountId', {
            rules: [
              {
                required: false,
                message: '会员卡号未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='付款方式' hasFeedback {...formItemLayout}>
          {getFieldDecorator('payway', {
            initialValue: "cash",
            rules: [{ required: true, message: '请输入性别' }],
          })(
            <Select placeholder="请选择付款方式">
              <Option value="cash">现金</Option>
              <Option value="member">会员卡</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
};

export default Form.create()(CheckOutModal)

/**
 * exchange modal
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
const MemberExchangeModal = ({
  visible,
  item={},
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
        memberId: item.id,
        score: form.score
      };
      confirm({
        title: '您确定要兑换积分吗?',
        onOk () {
          onOk(data);
        }
      })
    })
  }

  const modalOpts = {
    title: `会员积分兑换`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='兑换积分：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('score', {
            rules: [
              {
                required: true,
                message: '兑换积分未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
};

export default Form.create()(MemberExchangeModal)




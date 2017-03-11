/**
 * MemberEditModal
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
const MemberTransferModal = ({
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
        accountId: form.accountId,
        money: form.money
      };
      confirm({
        title: '您确定要转账吗?',
        onOk () {
          onOk(data);
        }
      })
    })
  }

  const modalOpts = {
    title: `转账到会员账户`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='银行卡号：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('accountId', {
            rules: [
              {
                required: true,
                message: '银行卡号未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='银行密码' hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '不能为空'
              }
            ]
          })(<Input type="password"/>)}
        </FormItem>
        <FormItem label='充值金额：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('money', {
            rules: [
              {
                required: false,
                message: '请输入充值金额'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
};

export default Form.create()(MemberTransferModal)



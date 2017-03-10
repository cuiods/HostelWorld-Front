/**
 * reserve modal
 */
import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal,DatePicker } from 'antd'
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};
const ReserveModal = ({
  memberId,
  visible,
  item = {},
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
      const data = {
        ...getFieldsValue(),
        roomId: item.id,
        memberId: memberId,
      };
      onOk(data)
    })
  }

  const modalOpts = {
    title: `创建预约`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='姓名：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '姓名未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='联系方式：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('contact', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请输入联系方式'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='开始日期' hasFeedback={...formItemLayout}>
          {getFieldDecorator('start', {
            rules: [{ type: 'object', required: true, message: '请输入开始时间' }],
          })(<DatePicker />)}
        </FormItem>
        <FormItem label='结束日期' hasFeedback={...formItemLayout}>
          {getFieldDecorator('end', {
            rules: [{ type: 'object', required: true, message: '请输入结束时间' }],
          })(<DatePicker />)}
        </FormItem>
        <FormItem label='备注：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('extra', {
            initialValue: '如安静的房间',
            rules: [
              {
                required: true,
                message: '不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
};

export default Form.create()(ReserveModal)

/**
 * MemberEditModal
 */
import React, { PropTypes } from 'react'
import { Form, Input, Select, Modal,DatePicker } from 'antd'
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
const EditMemberModal = ({
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
        avatar: form.avatar,
        description: form.description,
        gender: form.gender,
        memberId: item.id,
        password: form.password
      };
      confirm({
        title: '您确定要修改吗?',
        onOk () {
          onOk(data);
        }
      })
    })
  }

  const modalOpts = {
    title: `修改会员信息`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='头像：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('avatar', {
            initialValue: item.avatar,
            rules: [
              {
                required: true,
                message: '头像未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='描述：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: false,
                message: '请输入个人签名'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='性别' hasFeedback {...formItemLayout}>
          {getFieldDecorator('gender', {
            initialValue: item.gender,
            rules: [{ required: true, message: '请输入性别' }],
          })(
            <Select placeholder="请选择您的性别">
              <Option value="male">男</Option>
              <Option value="female">女</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label='密码' hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '不能为空'
              }
            ]
          })(<Input type="password"/>)}
        </FormItem>
      </Form>
    </Modal>
  )
};

export default Form.create()(EditMemberModal)


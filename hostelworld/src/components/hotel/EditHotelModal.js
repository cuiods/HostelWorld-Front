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
const EditHotelModal = ({
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
        hotelId: item.id,
        description: form.description,
        fullName: form.fullname,
        hotelStar: form.hotelStar,
        location: form.location,
        picture: item.picture,
        summary: form.summary,
        x: item.x,
        y: item.y,
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
    title: `修改酒店信息`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='酒店名称：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('fullname', {
            initialValue: item.fullname,
            rules: [
              {
                required: true,
                message: '名称未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='星级' hasFeedback {...formItemLayout}>
          {getFieldDecorator('hotelStar', {
            initialValue: item.star,
            rules: [{ required: true, message: '请输入酒店星级' }],
          })(
            <Select placeholder="请选择星级">
              <Select.Option value="one">一星级</Select.Option>
              <Select.Option value="two">二星级</Select.Option>
              <Select.Option value="three">三星级</Select.Option>
              <Select.Option value="four">四星级</Select.Option>
              <Select.Option value="five">五星级</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem label='简介：' hasFeedback {...formItemLayout}>
        {getFieldDecorator('summary', {
          initialValue: item.summary,
          rules: [
            {
              required: true,
              message: '请输入酒店简介'
            }
          ]
        })(<Input type="textarea" placeholder="酒店简介" autosize={{ minRows: 1, maxRows: 4 }} />)}
      </FormItem>
        <FormItem label='地址：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('location', {
            initialValue: item.location,
            rules: [
              {
                required: true,
                message: '请输入酒店地址'
              }
            ]
          })(<Input type="textarea" placeholder="酒店地址" autosize={{ minRows: 1, maxRows: 4 }} />)}
        </FormItem>
        <FormItem label='描述：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: false,
                message: '请输入酒店介绍'
              }
            ]
          })(<Input type="textarea" placeholder="酒店详细描述" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
      </Form>
    </Modal>
  )
};

export default Form.create()(EditHotelModal)



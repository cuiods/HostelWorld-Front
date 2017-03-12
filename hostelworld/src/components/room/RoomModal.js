/**
 * room modal
 */
import React, { PropTypes } from 'react'
import { Form, Input, Modal,DatePicker , Select} from 'antd'
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
const RoomAddModal = ({
  hotelId,
  visible,
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
        hotelId: hotelId,
        start: form.start.format("YYYY-MM-DD"),
        end: form.end.format("YYYY-MM-DD"),
        bedType: form.bedType,
        description: form.description,
        number: form.number,
        people: form.people,
        price: form.price,
        roomType: form.type,
        size: form.size,
      };
      confirm({
        title: '您确定要创建该房间吗?',
        onOk () {
          onOk(data);
        }
      })
    })
  }

  const modalOpts = {
    title: `创建房间`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='床型' hasFeedback {...formItemLayout}>
          {getFieldDecorator('bedType', {
            rules: [{ required: true, message: '请输入房间床型' }],
          })(
            <Select placeholder="请选择房间床型">
              <Select.Option value="big">大床</Select.Option>
              <Select.Option value="two">双床</Select.Option>
              <Select.Option value="bigAndTwo">双人大床</Select.Option>
              <Select.Option value="normal">标准</Select.Option>
              <Select.Option value="normalAndTwo">双人标准</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem label='房间数量：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('number', {
            rules: [
              {
                required: true,
                message: '请输入房间数量'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='房间人数：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('people', {
            rules: [
              {
                required: true,
                message: '请输入房间人数'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='房间价格：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: '请输入房间价格'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='房间面积：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('size', {
            rules: [
              {
                required: false,
                message: '请输入房间面积'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='房间类型：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '请输入房间类型'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='开始日期' hasFeedback {...formItemLayout}>
          {getFieldDecorator('start', {
            rules: [{ type: 'object', required: true, message: '请输入开始时间' }],
          })(<DatePicker />)}
        </FormItem>
        <FormItem label='结束日期' hasFeedback {...formItemLayout}>
          {getFieldDecorator('end', {
            rules: [{ type: 'object', required: true, message: '请输入结束时间' }],
          })(<DatePicker />)}
        </FormItem>
        <FormItem label='描述：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            rules: [
              {
                required: false,
                message: '请输入房间描述'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
};

export default Form.create()(RoomAddModal)


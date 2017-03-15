/**
 * check in modal
 */
import React, { PropTypes } from 'react'
import { Form, Input, Button, Modal,Icon, DatePicker } from 'antd'
import styles from './CheckInModal.less'
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
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 20, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
let uuid = 0;
const CheckInModal = ({
  visible,
  userId,
  roomId,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    setFieldsValue
  }
}) => {
  function removeTenant (k)  {
    const keys = getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  function addTenant() {
    uuid++;
    const keys = getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    setFieldsValue({
      keys: nextKeys,
    });
  }
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const form = getFieldsValue();
      const data = {
        ...form,
        start:form.start.format("YYYY-MM-DD"),
        end: form.end.format("YYYY-MM-DD"),
        userId: userId
      };
      confirm({
        title: '确定入住吗?',
        onOk () {
          onOk(data);
          uuid = 0;
        }
      })
    })
  }

  getFieldDecorator('keys', { initialValue: [] });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => {
    return (
      <div key={k}>
        <FormItem
          {...(formItemLayout )}
          label={ `房客${k}姓名`}
          required={true}
        >
          {getFieldDecorator(`tenantName${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入房客姓名",
            }],
          })(
            <Input placeholder="房客姓名" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className={styles["dynamic-delete-button"]}
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => removeTenant(k)}
          />
        </FormItem>
        <FormItem
          {...( formItemLayout )}
          label={`房客${k}身份证`}
          required={true}
        >
          {getFieldDecorator(`tenantCard${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入房客身份证号",
            }],
          })(
            <Input placeholder="身份证号" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className={styles["dynamic-delete-button"]}
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => removeTenant(k)}
          />
        </FormItem>
      </div>
    );
  });

  const modalOpts = {
    title: `入住登记`,
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
        <FormItem label='房间号：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('roomId', {
            rules: [
              {
                required: true,
                message: '房间号未填写'
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
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={addTenant} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加房客
          </Button>
        </FormItem>
      </Form>
    </Modal>
  )
};

export default Form.create()(CheckInModal)


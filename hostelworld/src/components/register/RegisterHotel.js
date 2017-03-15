/**
 * create hotel
 */
import React, {PropTypes} from 'react'
import {Form, Select, Tooltip, Input, Icon, Button,Modal} from 'antd'
import classnames from 'classnames'
const FormItem = Form.Item;
const confirm = Modal.confirm;
const RegisterHotel = ({
  onRegister,
  form : {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue
  }

}) => {

  let state = {
    confirmDirty: false,
  };

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const form = getFieldsValue();
      const data = {
        ...form,
        avatar:"http://hostel-world.oss-cn-shanghai.aliyuncs.com/images/avatar.png",
        picture: "http://hostel-world.oss-cn-shanghai.aliyuncs.com/images/logo.png",
        x:1,
        y:1
      };
      confirm({
        title: '您确定要创建酒店吗?',
        onOk () {
          onRegister(data);
        }
      })
    })
  }

  function handleConfirmBlur(e) {
    const value = e.target.value;
    state = { ...state,confirmDirty: state.confirmDirty || !!value };
  }

  function checkPassword(rule, value, callback) {
    if (value && value !== getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  }

  function checkConfirm(rule, value, callback) {
    if (value && state.confirmDirty) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 14,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  };

  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select className="icp-selector">
      <Select.Option value="86">+86</Select.Option>
    </Select>
  );


  return (
    <Form onSubmit={handleSubmit}>
      <FormItem
        {...formItemLayout}
        label="用户名"
        hasFeedback>
        {getFieldDecorator('name', {
          rules: [{required: true, message: '请输入用户名',}],
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="密码"
        hasFeedback>
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: '请输入密码',
          }, {
            validator: checkConfirm,
          }],
        })(
          <Input type="password" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="确认密码"
        hasFeedback
      >
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: '请再次输入密码',
          }, {
            validator: checkPassword,
          }],
        })(
          <Input type="password" onBlur={handleConfirmBlur} />
        )}
      </FormItem>
      <FormItem label='性别' hasFeedback {...formItemLayout}>
        {getFieldDecorator('gender', {
          rules: [{ required: true, message: '请输入性别' }],
        })(
          <Select placeholder="请选择您的性别">
            <Option value="male">男</Option>
            <Option value="female">女</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={(
          <span>
              酒店全称&nbsp;
            <Tooltip title="酒店的全名" overlay="">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
        hasFeedback
      >
        {getFieldDecorator('fullName', {
          rules: [{ required: true, message: '请输入酒店全名' }],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem label='星级' hasFeedback {...formItemLayout}>
        {getFieldDecorator('hotelStar', {
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
      <FormItem
        {...formItemLayout}
        label="电话号码"
      >
        {getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入电话号码' }],
        })(
          <Input addonBefore={prefixSelector} />
        )}
      </FormItem>
      <FormItem label='地址：' hasFeedback {...formItemLayout}>
        {getFieldDecorator('location', {
          rules: [
            {
              required: true,
              message: '请输入酒店地址'
            }
          ]
        })(<Input type="textarea" placeholder="酒店地址" autosize={{ minRows: 1, maxRows: 4 }} />)}
      </FormItem>
      <FormItem label='简介：' hasFeedback {...formItemLayout}>
        {getFieldDecorator('summary', {
          rules: [
            {
              required: true,
              message: '请输入酒店简介'
            }
          ]
        })(<Input type="textarea" placeholder="酒店简介" autosize={{ minRows: 1, maxRows: 4 }} />)}
      </FormItem>
      <FormItem label='描述：' hasFeedback {...formItemLayout}>
        {getFieldDecorator('description', {
          rules: [
            {
              required: false,
              message: '请输入酒店介绍'
            }
          ]
        })(<Input type="textarea" placeholder="酒店详细描述" autosize={{ minRows: 2, maxRows: 6 }} />)}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="large">提交</Button>
      </FormItem>
    </Form>
  );
};


export default  Form.create()(RegisterHotel);

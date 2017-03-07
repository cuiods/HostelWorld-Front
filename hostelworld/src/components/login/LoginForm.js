import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Alert, message, Card} from 'antd';
import styles from './LoginForm.less';

const FormItem = Form.Item;

const LoginForm = ({
  userId,
  onLogin,
  alertVisible,
  closeAlert,
  form : {
    getFieldDecorator,
    validateFields
  }

}) => {

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        onLogin(values);
      }
    });
  }

  function onClose() {
    closeAlert()
  }

  function loginFailure(alertVisible) {
    if(alertVisible){
      return (<Alert
        message="登录失败"
        description="错误的用户名或密码"
        type="error"
        closable
        onClose={onClose}
      />)
    }
  }

  return (
    <div className={styles['login-form']}>

      <div className={styles['alert']}>
        {loginFailure(alertVisible)}
      </div>
      <div className={styles['logo']}>
        <img src="http://hostel-world.oss-cn-shanghai.aliyuncs.com/images/logo.png" />
      </div>
      <Card className={styles['card']}>
      <Form className={styles["login-inline-form"]} onSubmit={handleSubmit} >
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: userId,
            rules: [{required: true, message: '请输入用户名!'}],
          })(
            <Input addonBefore={<Icon type="user"/>} placeholder="用户名"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请输入密码!'}],
          })(
            <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="密码"/>
          )}
        </FormItem>
        <FormItem style={{marginBottom: 0}}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>自动登录</Checkbox>
          )}
          <a className={styles["login-form-forgot"]}>忘记密码</a>
          <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
            登 录
          </Button>
          或者 <a>注册账号</a>
        </FormItem>
      </Form>
      </Card>
    </div>
  );

};


LoginForm.propTypes = {
  login: React.PropTypes.func
};

export default  Form.create()(LoginForm);

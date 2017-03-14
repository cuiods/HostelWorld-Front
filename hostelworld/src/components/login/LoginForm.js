import React, {PropTypes} from 'react'
import {Form, Icon, Input, Button, Checkbox, Alert, message, Card} from 'antd';
import styles from './LoginForm.less';

const FormItem = Form.Item;

const LoginForm = ({
  userId,
  alertVisible,
  loginMsg,
  onLogin,
  closeAlert,
  onRegisterHotel,
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

  function onButtonRegister() {
    onRegisterHotel()
  }

  function loginFailure(alertVisible) {
    if(alertVisible){
      return (<Alert
        message="Login failed."
        description={loginMsg}
        type="error"
        closable
        onClose={onClose}
      />)
    }
  }

  return (
    <div className={styles['login-form']}>

      <div className={styles['logo']}>
        <img src="http://hostel-world.oss-cn-shanghai.aliyuncs.com/images/logo.png" />
      </div>
      <div className={styles['alert']}>
        {loginFailure(alertVisible)}
      </div>
      <Card className={styles['card']}>
      <Form className={styles["login-inline-form"]} onSubmit={handleSubmit} >
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: userId,
            rules: [{required: true, message: 'Please enter user name!'}],
          })(
            <Input addonBefore={<Icon type="user"/>} placeholder="username"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please enter password!'}],
          })(
            <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="password"/>
          )}
        </FormItem>
        <FormItem style={{marginBottom: 0}}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className={styles["login-form-forgot"]}>忘记密码?</a>
          <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
            登陆
          </Button>
        </FormItem>
      </Form>
        <div style={{textAlign: "center"}}>或者</div>
        <div className={styles['button-margin']}>
          <Button type="primary" onClick={onButtonRegister} className={styles["login-form-button"]}>
            注册
          </Button>
        </div>
      </Card>
    </div>
  );

};

LoginForm.propTypes = {
  onRegisterHotel: PropTypes.func,
};


export default  Form.create()(LoginForm);

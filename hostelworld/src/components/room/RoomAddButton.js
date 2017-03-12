import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Switch } from 'antd'

const add = ({
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {

  return (
    <Row gutter={24}>
      <Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24} style={{marginBottom: 16, textAlign: 'right', float: 'right'}}>
        <Button size='large' type='ghost' onClick={onAdd}>添加</Button>
      </Col>
    </Row>
  )
};

add.propTypes = {
  form: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func
};

export default Form.create()(add)


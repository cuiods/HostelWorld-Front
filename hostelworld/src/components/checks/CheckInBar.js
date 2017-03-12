/**
 * check in bar
 */
import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Switch } from 'antd'
import SearchGroup from '../ui/search'

const CheckInBar = ({
  field,
  keyword,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [{ value: 'roomId', name: '房号' }],
    selectProps: {
      defaultValue: field || 'roomId'
    },
    onSearch: (value) => {
      onSearch(value)
    }
  };

  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
        <SearchGroup {...searchGroupProps} />
      </Col>
      <Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24} style={{marginBottom: 16, textAlign: 'right'}}>
        <Button size='large' type='ghost' onClick={onAdd}>入住登记</Button>
      </Col>
    </Row>
  )
};

CheckInBar.propTypes = {
  form: PropTypes.object,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
};

export default Form.create()(CheckInBar)


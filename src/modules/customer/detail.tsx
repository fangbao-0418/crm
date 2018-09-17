import React from 'react'
import { Row, Col, Input, Select } from 'antd'
const Option = Select.Option
class Detail extends React.Component {
  public render () {
    const selectBefore = (
      <Select defaultValue="1" style={{ width: 90 }}>
        <Option value="1">公司名</Option>
        <Option value="2">法人</Option>
        <Option value="2">特殊公司</Option>
      </Select>
    )
    return (
      <div>
        <Row>
          <Col span={12}>
            <label>公司名</label>
            <Input/>
          </Col>
          <Col span={12}>
            <label>公司名</label>
            <Input/>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Detail
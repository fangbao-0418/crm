import React from 'react'
import { Row, Col, Input } from 'antd'
class Detail extends React.Component {
  public render () {
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
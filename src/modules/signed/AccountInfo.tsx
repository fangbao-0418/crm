import React from 'react'
import { Row, Col } from 'antd'
import Card from '@/components/Card'
class Main extends React.Component {
  public render () {
    return (
      <div>
        <Card></Card>
        <Row gutter={12}>
          <Col span={8}>
            <label>当前账期：</label>
            <span>2018-09</span>
          </Col>
          <Col span={8}>
            <label>记账状态：</label>
            <span>正常做账</span>
          </Col>
          <Col span={8}>
            <label>运营会计：</label>
            <span>大大</span>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <label>核算会计：</label>
            <span>小小</span>
          </Col>
          <Col span={8}>
            <label>服务期止：</label>
            <span>2018-09</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Main

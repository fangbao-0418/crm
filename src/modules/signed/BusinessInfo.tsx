import React from 'react'
import { Row, Col, Input, Select } from 'antd'
import Card from '@/components/Card'
const styles = require('./style')
const { TextArea } = Input
const Option = Select.Option
class Main extends React.Component {
  public render () {
    return (
      <div>
        <Card></Card>
        <div>
          <Row className='mt12'>
            <Col span={16}>
              <span>信息来源：</span>
              <Input/>
            </Col>
            <Col span={8}>
              <span>法人姓名：</span>
              <Input/>
            </Col>
          </Row>
          <Row className='mt12'>
            <Col span={12}>
              <span>统一社会信用代码：</span>
              <Input/>
            </Col>
            <Col span={12}>
              <span>注册号：</span>
              <Input/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <span>注册资金：</span>
              <Input/>
            </Col>
            <Col span={12}>
              <span>营业期限：</span>
              <Input/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span>公司地址：</span>
              <Input/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span>公司地址：</span>
              <Input/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span>经营范围：</span>
              <TextArea rows={4} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default Main

import React from 'react'
import { Row, Col, Radio, Select } from 'antd'
const Option = Select.Option
const children: JSX.Element[] = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}
class Main extends React.Component {
  public handleChange (value: any) {
    console.log(`selected ${value}`)
  }
  public render () {
    return (
      <div>
        <Row>
          <Col span={6}>
            <Radio>全部销售</Radio>
          </Col>
          <Col span={3}>
            <Radio>自定义销售</Radio>
          </Col>
          <Col span={15}>
            <Select
              mode='multiple'
              style={{ width: '100%' }}
              placeholder='Please select'
              defaultValue={['a10', 'c12']}
              onChange={this.handleChange.bind(this)}
            >
              {children}
            </Select>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Main

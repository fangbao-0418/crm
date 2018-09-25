import React from 'react'
import { Row, Col, Input, Select } from 'antd'
const styles = require('../style')
const Option = Select.Option
class Main extends React.Component {
  public render () {
    return (
      <div>
        <Row className='mt12'>
          <Col span={7}>
            <span>区域：</span>
            <Select
              style={{width:'100px'}}
            >
              <Option key='1'>朝阳区</Option>
              <Option key='2'>丰台区</Option>
            </Select>
          </Col>
          <Col span={8}>
            <span>主联系人：</span>
            <Input className={styles['input-width']}/>
          </Col>
          <Col span={9}>
            <span>主联系电话：</span>
            <Input className={styles['input-width']}/>
          </Col>
        </Row>
        <Row className='mt12'>
          <Col span={7}>
            <span>纳税人类别：</span>
            <Select
              style={{width:'100px'}}
            >
              <Option key='1'>小规模</Option>
              <Option key='2'>一般纳税人</Option>
            </Select>
          </Col>
          <Col span={9}>
            <span>法人身份证号：</span>
            <Input className={styles['input-width']}/>
          </Col>
          <Col span={8}>
            <span>营业执照：</span>
            <img/>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <span>法人身份证：</span>
            <img/>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Main

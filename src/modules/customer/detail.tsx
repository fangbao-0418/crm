import React from 'react'
import { Row, Col, Input, Select } from 'antd'
const styles = require('./index.styl')
const Option = Select.Option
class Detail extends React.Component {
  public render () {
    const selectBefore = (
      <Select defaultValue='1' style={{ width: 90 }}>
        <Option value='1'>公司名</Option>
        <Option value='2'>自然人</Option>
        <Option value='3'>特殊公司</Option>
      </Select>
    )
    return (
      <div className={styles['base-info']}>
        <Row className={styles.mt12} gutter={10}>
          <Col span={12}>
            <Input addonBefore={selectBefore}/>
          </Col>
          <Col span={12}>
            <Input addonBefore='法人'/>
          </Col>
        </Row>
        <Row className={styles.mt12} gutter={10}>
          <Col span={12}>
            <Input addonBefore='联系人'/>
          </Col>
          <Col span={12}>
            <Input addonBefore='联系电话'/>
          </Col>
        </Row>
        <Row className={styles.mt12} gutter={10}>
          <Col span={12}>
            <Input addonBefore='客户资源'/>
          </Col>
          <Col span={12}>
            <Input addonBefore='纳税性质'/>
          </Col>
        </Row>
        <Row className={styles.mt12}>
          <Col span={24}>
            <Input addonBefore='地区'/>
          </Col>
        </Row>
        <Row className={styles.mt12}>
          <Col span={24}>
            <Input addonBefore='公司地址'/>
          </Col>
        </Row>
        <Row className={styles.mt12}>
          <Col span={24}>
            <Input addonBefore='备注'/>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Detail

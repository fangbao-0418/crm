import React from 'react'
import { Input, Row, Col } from 'antd'
import FormItemLayout from '@/components/form/Item1'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <FormItemLayout
        label='主联系人'
        labelStyle={{
          verticalAlign: 'top',
          lineHeight: '32px'
        }}
      >
        <div className={styles.container}>
          <Row>
            <Col span={12}>
              <Input />
            </Col>
            <Col span={12}>
              <Input />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className={styles.operate}>
                <div className={styles.add}>+</div>
                <div className={styles.delete}>-</div>
              </div>
              <Input />
            </Col>
            <Col span={12} push={1}>
              <Input />
            </Col>
          </Row>
        </div>
      </FormItemLayout>
    )
  }
}
export default Main

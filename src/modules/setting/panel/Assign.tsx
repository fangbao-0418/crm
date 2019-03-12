import React from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Card from '@/components/Card'
const styles = require('./style')
const FormItem = Form.Item
type Props = FormComponentProps
interface State {
  editable: boolean
}
class Main extends React.Component<Props> {
  public state: State = {
    editable: false
  }
  public render () {
    const { editable } = this.state
    const { getFieldDecorator }  = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    }
    return (
      <Card
        title='自动分客设置'
        titleClassName={styles.title}
        rightContent={(
          <div
            onClick={() => {
              this.setState({
                editable: true
              })
            }}
          >
            设置
          </div>
        )}
      >
        {!editable ? (
          <Row>
            <Col span={6}><span>销售库容：</span><span>100天</span></Col>
            <Col span={6}><span>最大跟近期：</span><span>100天</span></Col>
            <Col span={6}><span>最大保护期：</span><span>100天</span></Col>
          </Row>
        ) : (
          <Form>
            <div className={styles.box}>
              <FormItem
                label='销售库容'
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('abc')(
                      <Input />
                    )}
                  </Col>
                  <Col span={8}>
                    天
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                label='最大跟近期'
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('abc')(
                      <Input />
                    )}
                  </Col>
                  <Col span={8}>
                    天
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                label='最大保护期'
                {...formItemLayout}
                style={{margin: 0}}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('abc')(
                      <Input />
                    )}
                  </Col>
                  <Col span={8}>
                    天
                  </Col>
                </Row>
              </FormItem>
            </div>
            <Button
              className='mt20'
              type='primary'
              onClick={() => {
                this.setState({
                  editable: false
                })
              }}
            >
              保存
            </Button>
          </Form>
        )}
      </Card>
    )
  }
}
export default Form.create()(Main)

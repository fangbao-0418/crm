import React from 'react'
import { Form, Row, Col, Input, Select, Button, Checkbox, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const styles = require('../style')
const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item
type Props = FormComponentProps
class Main extends React.Component<Props> {
  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form
          // onSubmit={this.handleSubmit}
        >
          <Row >
            <Col span={16}>
              <FormItem
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                label='信息来源'
              >
                {getFieldDecorator('a')(
                  <div>
                    <Input
                      style={{width: '150px'}}
                    />
                    <Button className='mr5' type='primary'>查询</Button>
                    <Button className='mr5' type='primary'>网址</Button>
                    <Button type='primary'>特殊公司</Button>
                  </div>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='法人姓名'
              >
                {getFieldDecorator('b')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row >
            <Col span={24}>
              <FormItem
                className='inline-block'
                style={{width: '390px'}}
                labelCol={{span: 9}}
                wrapperCol={{span: 15}}
                label='统一社会信用代码：'
              >
                {getFieldDecorator('c')(
                  <Input />
                )}
              </FormItem>
              <FormItem
                className='inline-block'
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='注册号'
              >
                {getFieldDecorator('d')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='注册资金'
              >
                {getFieldDecorator('e')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                className='inline-block'
                style={{width: '270px'}}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='营业期限'
              >
                {getFieldDecorator('f')(
                  <DatePicker />
                )}
              </FormItem>
              <FormItem
                className='inline-block ml5'
              >
                {getFieldDecorator('g')(
                  <Checkbox>无期限</Checkbox>
                )}
              </FormItem>
              <FormItem
                className='inline-block'
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='公司地址'
              >
                {getFieldDecorator('h')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                labelCol={{span: 3}}
                wrapperCol={{span: 21}}
                style={{width: '720px'}}
                label='经营范围'
              >
                {getFieldDecorator('i')(
                  <Input.TextArea />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
export default Form.create()(Main)

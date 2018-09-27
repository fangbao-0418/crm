import React from 'react'
import { Form, Row, Col, Input, Select, Button, Checkbox, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const styles = require('../style')
const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item
interface Props extends FormComponentProps {
  editable?: boolean
}
class Main extends React.Component<Props> {
  public render () {
    const { getFieldDecorator } = this.props.form
    const editable = this.props.editable
    return (
      <div style={{width: '790px', marginLeft: '10px'}}>
        <Form
          // onSubmit={this.handleSubmit}
        >
          <Row >
            <Col span={18}>
              <FormItem
                style={{marginLeft: '-4px'}}
                labelCol={{span: 3}}
                wrapperCol={{span: 21}}
                label='信息来源'
              >
                {editable ? getFieldDecorator('a')(
                  <div>
                    <Input.Search
                      style={{width: '322px'}}
                      enterButton='查询'
                      onSearch={(value) => console.log(value)}
                    />
                    <Button className='ml5 mr5' type='primary'>网址</Button>
                    <Button type='primary'>特殊公司</Button>
                  </div>
                ) : 'xxx'}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='法人姓名'
              >
                {editable ? getFieldDecorator('b')(
                  <Input />
                ) : 'xxx'}
              </FormItem>
            </Col>
          </Row>
          <Row >
            <Col span={10}>
              <FormItem
                style={{marginLeft: '-22px'}}
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
                label='统一社会信用代码'
              >
                {editable ? getFieldDecorator('c')(
                  <Input />
                ) : <span>xxx</span>}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                // className='inline-block'
                labelCol={{span: 8}}
                wrapperCol={{span: 14}}
                label='注册号'
              >
                {editable ? getFieldDecorator('d')(
                  <Input />
                ) : 'xxx'}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='注册资金'
              >
                {editable ? getFieldDecorator('e')(
                  <Input />
                ) : 'xxx'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                className='inline-block'
                style={{width: '270px'}}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                label='营业期限'
              >
                {editable ? getFieldDecorator('f')(
                  <DatePicker />
                ) : 'xxx'}
              </FormItem>
              <FormItem
                className='inline-block ml5'
              >
                {editable && getFieldDecorator('g')(
                  <Checkbox>无期限</Checkbox>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                style={{width: '100%'}}
                // className='inline-block'
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='公司地址'
              >
                {editable ? getFieldDecorator('h')(
                  <Input />
                ) : 'xxx'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                labelCol={{span: 2}}
                wrapperCol={{span: 22}}
                style={{width: '100%'}}
                label='经营范围'
              >
                {editable ? getFieldDecorator('i')(
                  <Input.TextArea />
                ) : 'xxx'}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
export default Form.create()(Main)

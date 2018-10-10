import React from 'react'
import { Form, Row, Col, Input, Button, Checkbox, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { connect } from 'react-redux'
import moment from 'moment'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  disabled?: boolean
  detail: Customer.DetailProps
}
class Main extends React.Component<Props> {
  public render () {
    const { getFieldDecorator } = this.props.form
    const disabled = this.props.disabled
    const detail = this.props.detail
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
                label='公司名称'
              >
                {!disabled ? getFieldDecorator(
                  'customerName',
                  {
                    initialValue: detail.customerName
                  }
                )(
                  <div>
                    <Input.Search
                      style={{width: '322px'}}
                      enterButton='查询'
                      onSearch={(value) => console.log(value)}
                      value={detail.customerName}
                    />
                    <Button className='ml5 mr5' type='primary'>网址</Button>
                    <Button type='primary'>特殊公司</Button>
                  </div>
                ) : <span>{detail.customerName}</span>
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='法人姓名'
              >
                {!disabled ? getFieldDecorator(
                  'legalPerson',
                  {
                    initialValue: detail.legalPerson
                  }
                )(
                  <Input />
                ) : <span>{detail.legalPerson}</span>}
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
                {!disabled ? getFieldDecorator(
                  'unifiedCreditCode',
                  {
                    initialValue: detail.unifiedCreditCode
                  }
                )(
                  <Input />
                ) : <span>{detail.unifiedCreditCode}</span>}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                // className='inline-block'
                labelCol={{span: 8}}
                wrapperCol={{span: 14}}
                label='注册号'
              >
                {!disabled ? getFieldDecorator(
                  'companyRegisterCode',
                  {
                    initialValue: detail.companyRegisterCode
                  }
                )(
                  <Input />
                ) : <span>{detail.companyRegisterCode}</span>}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='注册资金'
              >
                {!disabled ? getFieldDecorator(
                  'registeredCapital',
                  {
                    initialValue: detail.registeredCapital
                  }
                )(
                  <Input />
                ) : <span>{detail.registeredCapital}</span>}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {!disabled ? (
                <div>
                  <FormItem
                    className='inline-block'
                    style={{width: disabled ? '270px' : null}}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    label='营业期限'
                  >
                    {getFieldDecorator('f')(
                      <DatePicker />
                    )}
                  </FormItem>
                  <FormItem
                    className='inline-block ml5'
                  >
                    {!disabled && getFieldDecorator('g')(
                      <Checkbox>无期限</Checkbox>
                    )}
                  </FormItem>
                </div>
              ) : (
                <FormItem
                  className='inline-block'
                  style={{width: '100%'}}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  label='营业期限'
                >
                  <span>
                    {moment(detail.businessHoursBegin).format('YYYY年MM月DD日')}
                      -
                    {moment(detail.businessHoursEnd).format('YYYY年MM月DD日')}
                  </span>
                </FormItem>
              )}
            </Col>
            <Col span={12}>
              <FormItem
                style={{width: '100%'}}
                // className='inline-block'
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                label='公司地址'
              >
                {!disabled ? getFieldDecorator(
                  'address',
                  {
                    initialValue: detail.address
                  }
                )(
                  <Input />
                ) : <span>{detail.address}</span>}
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
                {!disabled ? getFieldDecorator(
                  'businessScope',
                  {
                    initialValue: detail.businessScope
                  }
                )(
                  <Input.TextArea />
                ) : <span>{detail.businessScope}</span>}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Form.create({
  onValuesChange: (props: Customer.Props, changeValue, allValues) => {
    console.log('change')
    const detail = Object.assign({}, props.detail, allValues)
    console.log(allValues)
    APP.dispatch({
      type: 'change customer data',
      payload: {
        detail
      }
    })
  }
})(Main))

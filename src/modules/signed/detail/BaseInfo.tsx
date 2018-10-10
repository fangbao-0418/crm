import React from 'react'
import { Form, Row, Col, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Uploader from './Uploader'
import { connect } from 'react-redux'
const Option = Select.Option
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
      <Form>
        <Row>
          <Col span={7}>
            <FormItem
              style={{marginLeft: '-41px'}}
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label='区域'
            >
              {!disabled ? (
                <Select
                  style={{width:'100px'}}
                >
                  <Option key='1'>朝阳区</Option>
                  <Option key='2'>丰台区</Option>
                </Select>
              ) : <span>{detail.areaName}</span>}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              labelCol={{span: 10}}
              wrapperCol={{span: 14}}
              label='纳税人类别'
            >
              {!disabled ? getFieldDecorator(
                'payTaxesNature',
                {
                  initialValue: detail.payTaxesNature
                }
              )(
                <Select
                  style={{width: '100px'}}
                >
                  {
                    APP.keys.EnumPayTaxesNature.map((item) => {
                      return (
                        <Option key={item.value}>{item.label}</Option>
                      )
                    })
                  }
                </Select>
              ) : (
                <span>{APP.dictionary[`EnumPayTaxesNature-${detail.payTaxesNature}`]}</span>
              )}
            </FormItem>
          </Col>
          <Col span={9}>
          <FormItem
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            label='法人身份证号'
          >
            {!disabled ? getFieldDecorator(
              'legalPersonCard',
              {
                initialValue: detail.legalPersonCard
              }
            )(
              <Input />
            ) : <span>{detail.legalPersonCard}</span>}
          </FormItem>
          </Col>
        </Row>
        <Row >
          <Col span={7}>
            <FormItem
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label='证件照片'
            >
              <Uploader className='mr5'/>
              <Uploader />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              labelCol={{span: 10}}
              wrapperCol={{span: 14}}
              label='营业执照'
            >
              <Uploader className='mr5'/>
              <Uploader />
            </FormItem>
          </Col>
        </Row>
      </Form>
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

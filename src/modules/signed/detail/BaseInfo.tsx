import React from 'react'
import { Form, Row, Col, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Uploader from './Uploader'
import { connect } from 'react-redux'
const styles = require('../style')
const Option = Select.Option
const FormItem = Form.Item
interface Props extends FormComponentProps {
  editable?: boolean
  detail: Customer.DetailProps
}
class Main extends React.Component<Props> {
  public render () {
    const editabled = this.props.editable
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
              {editabled ? (
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
              {editabled ? (
                <Select
                  style={{width:'100px'}}
                >
                  <Option key='1'>小规模</Option>
                  <Option key='2'>一般纳税人</Option>
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
            {editabled ? (
              <Input defaultValue={detail.payTaxesNature}/>
            ) : <span>{detail.payTaxesNature}</span>}
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
})(Form.create()(Main))

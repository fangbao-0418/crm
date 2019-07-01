import React from 'react'
import { Form, Row, Col, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Uploader from './Uploader'
import { connect } from 'react-redux'
import { fetchRegion } from '@/modules/common/api'
import Dropdown from 'pilipa/libs/dropdown'
const styles = require('./style')
const Option = Select.Option
const FormItem = Form.Item
interface State {
  areaList: Common.RegionProps[]
}
interface Props extends FormComponentProps {
  disabled?: boolean
  detail: Customer.DetailProps
}
class Main extends React.Component<Props, State> {
  public state: State = {
    areaList: []
  }
  public componentWillMount () {
    fetchRegion({
      parentId: APP.user.cityCode,
      level: 3
    }).then((res) => {
      this.setState({
        areaList: res
      })
    })
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    const disabled = this.props.disabled
    const detail = this.props.detail
    return (
      <div className={styles.label}>
      <Form>
        <Row>
          <Col span={7}>
            <FormItem
              style={{marginLeft: '-41px'}}
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              label='地区'
            >
              {!disabled ? getFieldDecorator(
                'area',
                {
                  initialValue: detail.areaCode !== undefined ? {
                    key: detail.areaCode,
                    label: detail.areaName
                  } : undefined
                }
              )(
                <Select
                  labelInValue
                >
                  {
                    this.state.areaList.map((item) => {
                      return (
                        <Select.Option
                          key={item.code}
                        >
                          {item.name}
                        </Select.Option>
                      )
                    })
                  }
                </Select>
              ) : <span>{detail.areaName}</span>}
            </FormItem>
          </Col>
          {/* <Col span={8}>
            <FormItem
              labelCol={{span: 10}}
              wrapperCol={{span: 14}}
              label='纳税人类别'
            >
              {!disabled ? getFieldDecorator(
                'payTaxesNature',
                {
                  initialValue: detail.payTaxesNature ? String(detail.payTaxesNature) : ''
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
          </Col> */}
          <Col span={9}>
          <FormItem
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            label='法人身份证号'
          >
            {!disabled ? getFieldDecorator(
              'legalPersonCard',
              {
                rules: [{ max: 18, message: '身份证格式不正确' }],
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
              {getFieldDecorator(
                'idUrl1',
                {
                  initialValue: String(detail.legalPersonCardUrl).split(',')[0]
                }
              )(
                <Uploader
                  className='mr5'
                  disabled={disabled}
                  value={String(detail.legalPersonCardUrl).split(',')[0]}
                  onUploaded={(url) => {
                    this.props.form.setFieldsValue({
                      idUrl1: url
                    })
                  }}
                />
              )}
              {getFieldDecorator(
                'idUrl2',
                {
                  initialValue: String(detail.legalPersonCardUrl).split(',')[1]
                }
              )(
                <Uploader
                  disabled={disabled}
                  value={String(detail.legalPersonCardUrl).split(',')[1]}
                  onUploaded={(url) => {
                    this.props.form.setFieldsValue({
                      idUrl2: url
                    })
                  }}
                />
              )}
            </FormItem>
            {/* <FormItem>
            </FormItem> */}
          </Col>
          <Col span={8}>
            <FormItem
              labelCol={{span: 10}}
              wrapperCol={{span: 14}}
              label='营业执照'
            >
            {getFieldDecorator(
              'businessLicenseUrl',
              {
                initialValue: detail.businessLicenseUrl
              }
            )(
              <Uploader
                className='mr5'
                disabled={disabled}
                onUploaded={(url) => {
                  console.log(url, '营业执照')
                  this.props.form.setFieldsValue({
                    businessLicenseUrl: url
                  })
                }}
              />
            )}
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
    console.log(allValues, 'allValues')
    const detail = Object.assign({}, props.detail, allValues)
    const area = detail.area || {}
    delete detail.area
    detail.areaCode = area.key
    detail.areaName = area.label
    detail.legalPersonCardUrl = [detail.idUrl1, detail.idUrl2].join(',')
    delete detail.idUrl1
    delete detail.idUrl2
    APP.dispatch({
      type: 'change customer data',
      payload: {
        detail
      }
    })
  }
})(Main))

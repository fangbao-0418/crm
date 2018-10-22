import React from 'react'
import { Form, Row, Col, Input, Button, Checkbox, DatePicker, Dropdown, Menu } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { connect } from 'react-redux'
import Modal from 'pilipa/libs/modal'
import moment from 'moment'
import CompanySearch from './CompanySearch'
import { fetchGovInfo, fetchTianYanDetail } from '@/modules/common/api'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  disabled?: boolean
  detail: Customer.DetailProps
  getWrappedInstance?: (ref?: any) => any
}
interface State {
  disabled?: boolean
}
class Main extends React.Component<Props, State> {
  public state: State = {
    disabled: true
  }
  public componentWillMount () {
    if (this.props.getWrappedInstance) {
      this.props.getWrappedInstance(this)
    }
  }
  public searchUrl () {
    let url: string
    const modal = new Modal({
      title: '网址查询',
      content: (
        <div>
          <div>
            <Input
              onChange={(e) => {
                url = e.target.value
              }}
            />
          </div>
          <a
            href='http://www.gsxt.gov.cn/index.html'
            target='_blank'
          >
            http://www.gsxt.gov.cn/index.html
          </a>
        </div>
      ),
      onOk: () => {
        fetchGovInfo(url).then((res) => {
          modal.hide()
        })
      }
    })
    modal.show()
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    const disabled = this.props.disabled
    const detail = this.props.detail
    console.log(detail, 'detail')
    return (
      <div style={{width: '790px', marginLeft: '10px'}}>
        <Form
          // onSubmit={this.handleSubmit}
        >
          <Row >
            {
              disabled &&
              <Col span={6}>
                <FormItem
                  style={{marginLeft: '-4px'}}
                  labelCol={{span: 9}}
                  wrapperCol={{span: 12}}
                  label='信息来源：'
                >
                  <span>{APP.dictionary[`EnumCompanyInfoSource-${detail.companyInfoSource}`]}</span>
                </FormItem>
              </Col>
            }
            {
              !disabled &&
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
                      initialValue: detail.customerName,
                      rules: [
                        {
                          required: true,
                          message: '公司名称不能为空'
                        }
                      ]
                    }
                  )(
                    <div>
                      <CompanySearch
                        className='inline-block'
                        enterButton='查询'
                        style={{width: '322px'}}
                        value={detail.customerName}
                        onSelectCompany={(item) => {
                          fetchTianYanDetail(item.id).then((res) => {
                            res.companyInfoSource = 1
                            res.isConfirmed = 1
                            APP.dispatch({
                              type: 'change customer data',
                              payload: {
                                detail: Object.assign({}, detail, res)
                              }
                            })
                          })
                          this.setState({
                            disabled: true
                          })
                        }}
                      />
                      <Button
                        className='ml5 mr5'
                        type='primary'
                        onClick={this.searchUrl.bind(this)}
                      >
                        网址
                      </Button>
                      <Button
                        type='primary'
                        onClick={() => {
                          detail.isConfirmed = 0
                          detail.companyInfoSource = 3
                          this.setState({
                            disabled: false
                          })
                        }}
                      >
                        特殊公司
                      </Button>
                    </div>
                  ) : ''}
                </FormItem>
              </Col>
            }
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
                  <Input disabled={this.state.disabled} />
                ) : <span>{detail.legalPerson}</span>}
              </FormItem>
            </Col>
          </Row>
          <Row >
            <Col span={10}>
              <FormItem
                style={{marginLeft: '-18px'}}
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
                label='统一社会信用代码'
                required
              >
                {!disabled ? getFieldDecorator(
                  'unifiedCreditCode',
                  {
                    initialValue: detail.unifiedCreditCode,
                    rules: [
                      {
                        required: true,
                        message: '统一社会信用代码不能为空'
                      }
                    ]
                  }
                )(
                  <Input disabled={this.state.disabled} />
                ) : <span>{detail.unifiedCreditCode}</span>}
              </FormItem>
            </Col>
            {/* <Col span={8}>
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
                  <Input disabled={this.state.disabled} />
                ) : <span>{detail.companyRegisterCode}</span>}
              </FormItem>
            </Col> */}
            <Col span={8}>
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
                  <Input disabled={this.state.disabled}  />
                ) : <span>{detail.registeredCapital}</span>}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {!disabled ? (
                <div>
                  <FormItem
                    className='inline-block'
                    labelCol={{span: 7}}
                    wrapperCol={{span: 17}}
                    label='营业期限'
                  >
                    {getFieldDecorator(
                      'businessHoursBegin',
                      {
                        initialValue: detail.businessHoursBegin ? moment(detail.businessHoursBegin) : undefined
                      }
                    )(
                      <DatePicker disabled={this.state.disabled} placeholder=''/>
                    )}
                  </FormItem>
                  <span
                    style={{
                      lineHeight: '40px',
                      margin: '0 10px'
                    }}
                  >
                    -
                  </span>
                  <FormItem
                    className='inline-block'
                  >
                    {getFieldDecorator(
                      'businessHoursEnd',
                      {
                        initialValue: detail.businessHoursEnd ? moment(detail.businessHoursEnd) : undefined
                      }
                    )(
                      <DatePicker
                        placeholder=''
                        disabled={this.state.disabled || detail.isFixedPeriod === 1}
                      />
                    )}
                  </FormItem>
                  <FormItem
                    className='inline-block ml5'
                  >
                    {!disabled && getFieldDecorator(
                      'isFixedPeriod'
                    )(
                      <Checkbox checked={detail.isFixedPeriod === 1} disabled={this.state.disabled}>无期限</Checkbox>
                    )}
                  </FormItem>
                </div>
              ) : (
                <FormItem
                  className='inline-block'
                  style={{width: '100%'}}
                  labelCol={{span: 2}}
                  wrapperCol={{span: 22}}
                  label='营业期限'
                >
                  <span>
                    {moment(detail.businessHoursBegin).format('YYYY年MM月DD日')}
                      -
                    {detail.isFixedPeriod === 1 ?
                      '无期限'
                    :
                      moment(detail.businessHoursEnd).format('YYYY年MM月DD日')
                    }
                  </span>
                </FormItem>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                style={{width: '100%'}}
                // className='inline-block'
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                label='公司地址'
              >
                {!disabled ? getFieldDecorator(
                  'address',
                  {
                    initialValue: detail.address
                  }
                )(
                  <Input disabled={this.state.disabled} />
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
                  <Input.TextArea disabled={this.state.disabled} />
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
    const detail = Object.assign({}, props.detail, allValues)
    detail.isFixedPeriod = detail.isFixedPeriod ? 1 : 0
    APP.dispatch({
      type: 'change customer data',
      payload: {
        detail
      }
    })
  }
})(Main))

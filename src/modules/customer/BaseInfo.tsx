import React from 'react'
import { Row, Col, Icon, Button, Select, Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import Input from '@/components/input'
import TextArea from '@/components/textarea'
import FormItemLayout from '@/components/form/Item1'
import Modal from 'pilipa/libs/modal'
import LinkMain from '@/modules/common/link-man'
import AddButton from '@/modules/common/content/AddButton'
import Provider from '@/components/Provider'
import _ from 'lodash'
import { changeCustomerDetailAction } from './action'
import { connect } from 'react-redux'
import { addCustomer, updateCustomer } from './api'
const styles = require('./style')
const Option = Select.Option
const FormItem = Form.Item
interface Props extends Customer.Props, FormComponentProps {
  customerId?: string
  isBussiness?: boolean
  onClose?: () => void
  flowNow?: () => void
}
class Main extends React.Component<Props> {
  public componentWillMount () {
    if (this.props.customerId) {
      changeCustomerDetailAction(this.props.customerId)
    }
  }
  public editLinkMan () {
    const modal = new Modal({
      header: (
        <div>
          <div className='fl font14'>联系人</div>
          <b className='fr'>
            <AddButton
              onClick={this.addLinkMan.bind(this)}
            />
          </b>
        </div>
      ),
      onOk: () => {
        console.log(this.props.linkMan, 'linkMan')
        modal.hide()
      },
      content: <Provider><LinkMain /></Provider>
    })
    modal.show()
  }
  public addLinkMan () {
    const data = this.props.linkMan
    data.push({
      contactPerson: '',
      contactPhone: ''
      // customerSource: '',
      // mark: '',
      // worker: ''
    })
    console.log(data, 'data')
    APP.dispatch({
      type: 'change customer data',
      payload: {
        linkMan: data
      }
    })
  }
  public handleChange (e: React.SyntheticEvent, value: {key: string, value: any}) {
    const detail: any = this.props.detail
    _.set(detail, value.key, value.value)
    APP.dispatch({
      type: 'change customer data',
      payload: {
        detail
      }
    })
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    console.log(this.props.detail, 'render')
    return (
      <Form className={styles['base-info']}>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem
            >
              {getFieldDecorator(
                'customerName',
                {
                  rules: [
                    {
                      required: true,
                      message: '公司名不能为空'
                    }
                  ]
                }
              )(
                <Input
                  required
                  label={'公司名'}
                  field='customerName'
                  onChange={this.handleChange.bind(this)}
                  value={this.props.detail.customerName}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
          <FormItem
            >
              {getFieldDecorator(
                'customerSource',
                {
                  rules: [
                    {
                      required: true,
                      message: '客户来源不能为空'
                    }
                  ]
                }
              )(
                <FormItemLayout
                  label='客户来源'
                  required
                >
                  <Select
                    style={{width: '100%'}}
                    defaultValue={this.props.detail.customerSource}
                    onChange={(value) => {
                      this.handleChange(null, {
                        key: 'customerSource',
                        value
                      })
                    }}
                  >
                    {
                      APP.keys.EnumCustomerSource.map((item) => {
                        return (
                          <Option
                            key={item.value}
                          >
                            {item.label}
                          </Option>
                        )
                      })
                    }
                  </Select>
                </FormItemLayout>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} className='mt10' >
          <Col span={12}>
            <FormItem
            >
              {getFieldDecorator(
                'detail.contactPersons[0].contactPerson',
                {
                  valuePropName: this.props.detail.contactPersons[0].contactPerson,
                  rules: [
                    {
                      required: true,
                      message: '主联系人不能为空'
                    }
                  ]
                }
              )(
                <Input
                  required
                  label={'主联系人'}
                  field='contactPersons[0].contactPerson'
                  addonAfter={
                    (
                      <Icon
                        onClick={this.editLinkMan.bind(this)}
                        style={{cursor: 'pointer'}}
                        type='ellipsis'
                        theme='outlined'
                      />
                    )
                  }
                  onChange={this.handleChange.bind(this)}
                  value={this.props.detail.contactPersons[0].contactPerson}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem>
              {getFieldDecorator(
                'contactPersons[0].contactPhone',
                {
                  valuePropName: this.props.detail.contactPersons[0].contactPhone,
                  rules: [
                    {
                      required: true,
                      message: '主联系电话不能为空'
                    }
                  ]
                }
              )(
                <Input
                  required
                  label='主联系电话'
                  field='contactPersons[0].contactPhone'
                  onChange={this.handleChange.bind(this)}
                  value={this.props.detail.contactPersons[0].contactPhone}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              field='legalPerson'
              label='法人'
              onChange={this.handleChange.bind(this)}
              value={this.props.detail.legalPerson}
            />
          </Col>
          <Col span={12}>
            <FormItemLayout
              label='纳税类别'
            >
              <Select
                style={{width: '150px'}}
                // defaultValue={}
                onChange={(value) => {
                  this.handleChange(null, {
                    key: 'payTaxesNature',
                    value
                  })
                }}
              >
                {
                  APP.keys.EnumPayTaxesNature.map((item) => {
                    return (
                      <Option
                        key={item.value}
                      >
                        {item.label}
                      </Option>
                    )
                  })
                }
              </Select>
            </FormItemLayout>
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          {
            !this.props.isBussiness &&
            <Col span={12}>
              <Input
                field='cityCode'
                onChange={this.handleChange.bind(this)}
                label={'城市'}
                value={this.props.detail.cityCode}
              />
            </Col>
          }
          <Col span={12}>
            <Input
              field='areaCode'
              onChange={this.handleChange.bind(this)}
              label='地区'
              value={this.props.detail.areaCode}
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={24}>
            <Input
              field='address'
              onChange={this.handleChange.bind(this)}
              label={'公司地址'}
              value={this.props.detail.address}
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={24}>
            <TextArea
              field='remark'
              onChange={this.handleChange.bind(this)}
              label={'备注'}
              value={this.props.detail.remark}
            />
          </Col>
        </Row>
        <div className='text-right mt10'>
          <Button
            className='mr5'
            type='primary'
            onClick={() => {
              this.props.form.validateFields((errs: any, values: any) => {
                if (errs) {
                  return
                }
                const params = this.props.detail
                params.customerNameType = '1' // 后端不需要改代码所以加上
                params.isConfirmed = '1' // 是否天眼查
                params.contactPersons = this.props.linkMan
                // params.contactPersons = [{ contactPerson: '11', contactPhone: '122', isMainContact: '1'}]
                console.log(params, 'params')
                if (this.props.customerId) {
                  updateCustomer(this.props.customerId, params).then((res) => {
                    if (res.status === 200) {
                      APP.success('修改成功')
                    }
                  })
                } else {
                  addCustomer(params).then((res) => {
                    if (res.status === 200) {
                      APP.success('新增成功')
                      this.props.onClose()
                    }
                  })
                }
              })
            }}
          >
            保存
          </Button>
          {
            this.props.isBussiness &&
            <Button
              type='primary'
              onClick={() => {
                this.props.flowNow()
              }}
            >
              现在跟进
            </Button>
          }
        </div>
      </Form>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Form.create()(Main))

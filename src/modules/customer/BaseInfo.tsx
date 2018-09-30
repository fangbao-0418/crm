import React from 'react'
import { Row, Col, Icon, Button, Select } from 'antd'
import Input from '@/components/input'
import TextArea from '@/components/textarea'
import FormItem from '@/components/form/Item1'
import Modal from 'pilipa/libs/modal'
import LinkMain from '@/modules/common/link-man'
import AddButton from '@/modules/common/content/AddButton'
import Provider from '@/components/Provider'
import _ from 'lodash'
import { changeCustomerDetailAction } from './action'
import { connect } from 'react-redux'
import { addCustomer, updateCustomer } from './api'
const Option = Select.Option
interface Props extends Customer.Props {
  customerId?: string
  isFlowNow?: boolean
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
    return (
      <div>
        <Row gutter={8}>
          <Col span={12}>
            <Input
              label={'公司名'}
              field='customerName'
              onChange={this.handleChange.bind(this)}
              value={this.props.detail.customerName}
            />
          </Col>
          <Col span={12}>
            <Input
              field='legalPerson'
              label='法人'
              onChange={this.handleChange.bind(this)}
              value={this.props.detail.legalPerson}
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              label={'联系人'}
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
          </Col>
          <Col span={12}>
            <Input
              label='联系电话'
              field='contactPersons[0].contactPhone'
              onChange={this.handleChange.bind(this)}
              value={this.props.linkMan[0].contactPhone}
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <FormItem
              label='客户来源'
            >
              <Select
                style={{width: '150px'}}
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
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label='纳税类别'
            >
              <Select
                style={{width: '150px'}}
                defaultValue={APP.keys.EnumPayTaxesNature[0].value}
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
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              field='cityName'
              onChange={this.handleChange.bind(this)}
              label={'城市'}
              value={this.props.detail.cityName}
            />
          </Col>
          <Col span={12}>
            <Input
              field='cityCode'
              onChange={this.handleChange.bind(this)}
              label='地区'
              value={this.props.detail.cityCode}
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
              console.log(this.props.detail, 'this.props.detail')
              const params = this.props.detail
              params.customerNameType = '1'
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
            }}
          >
            保存
          </Button>
          {
            this.props.isFlowNow &&
            <Button
              onClick={() => {
                this.props.flowNow()
              }}
            >
              现在跟进
            </Button>
          }
        </div>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)

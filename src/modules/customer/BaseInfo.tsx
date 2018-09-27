import React from 'react'
import { Row, Col, Icon, Button } from 'antd'
import Input from '@/components/input'
import TextArea from '@/components/textarea'
import Modal from 'pilipa/libs/modal'
import LinkMain from '@/modules/common/link-man'
import AddButton from '@/modules/common/content/AddButton'
import Provider from '@/components/Provider'
import { connect } from 'react-redux'
import { addCustomer, viewCustomer } from './api'
interface Props extends Customer.Props {
  customerId?: string
  onClose?: () => void
}
class Main extends React.Component<Props> {
  public componentWillMount () {
    viewCustomer(this.props.customerId).then((res: any) => {
      console.log(res)
    })
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
  public handleChange (e: React.SyntheticEvent, value: any) {
    const detail: any = this.props.detail
    detail[value.key] = value.value
    console.log(detail, 'detail')
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
              // value={this.props.detail.customerName}
            />
          </Col>
          <Col span={12}>
            <Input
              field='legalPerson'
              label='法人'
              onChange={this.handleChange.bind(this)}
              // value={this.props.detail.legalPerson}
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              label={'联系人'}
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
              value={this.props.linkMan[0].contactPerson}
            />
          </Col>
          <Col span={12}>
            <Input
              label='联系电话'
              value={this.props.linkMan[0].contactPhone}
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              field='customerSource'
              label={'客户来源'}
              onChange={this.handleChange.bind(this)}
              // value={this.props.detail.customerSource}
            />
          </Col>
          <Col span={12}>
            <Input
              field='category'
              onChange={this.handleChange.bind(this)}
              label='纳税类别'
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              field='cityName'
              onChange={this.handleChange.bind(this)}
              label={'城市'}
            />
          </Col>
          <Col span={12}>
            <Input
              field='cityCode'
              onChange={this.handleChange.bind(this)}
              label='地区'
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={24}>
            <Input
              field='address'
              onChange={this.handleChange.bind(this)}
              label={'公司地址'}
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={24}>
            <TextArea
              field='remark'
              onChange={this.handleChange.bind(this)}
              label={'备注'}
            />
          </Col>
        </Row>
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={() => {
              console.log(this.props.detail, 'this.props.detail')
              const params = this.props.detail
              params.customerNameType = '1'
              // params.contactsList = this.props.linkMan
              params.contactPersons = [{ contactPerson: '11', contactPhone: '122', isMainContact: '1'}]
              console.log(params, 'params')
              addCustomer(params).then((res) => {
                if (res.status === 200) {
                  APP.success('新增成功')
                  this.props.onClose()
                }
              })
            }}
          >
            保存
          </Button>
        </div>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)

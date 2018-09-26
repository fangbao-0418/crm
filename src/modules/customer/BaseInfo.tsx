import React from 'react'
import { Row, Col, Icon, Button } from 'antd'
import Input from '@/components/input'
import TextArea from '@/components/textarea'
import Modal from 'pilipa/libs/modal'
import LinkMain from '@/modules/common/link-man'
import AddButton from '@/modules/common/content/AddButton'
import Provider from '@/components/Provider'
import { connect } from 'react-redux'
class Main extends React.Component<Customer.Props> {
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
      content: <Provider><LinkMain /></Provider>
    })
    modal.show()
  }
  public addLinkMan () {
    const data = this.props.linkMan
    data.push({
      contactPerson: '',
      contactPhone: '',
      customerSource: '',
      mark: ''
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
              label={
                [{
                  label: '公司名',
                  value: '1'
                }, {
                  label: '休闲鞋',
                  value: '2'
                }]
              }
              onChange={this.handleChange.bind(this)}
              value={this.props.detail.customerName}
            />
          </Col>
          <Col span={12}>
            <Input
              label='法人'
              value={this.props.detail.legalPerson}
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
              value={this.props.detail.customerSource}
            />
          </Col>
          <Col span={12}>
            <Input
              label='纳税类型'
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              label={'城市'}
            />
          </Col>
          <Col span={12}>
            <Input
              label='地区'
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={24}>
            <Input
              field='address'
              label={'公司地址'}
              value={'xxx'}
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={24}>
            <TextArea
              onChange={this.handleChange.bind(this)}
              label={'备注'}
              value={'xxx'}
            />
          </Col>
        </Row>
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={() => {
              console.log('click')
            }}
          >
            仅保存
          </Button>
        </div>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)

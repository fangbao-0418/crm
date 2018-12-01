import React from 'react'
import Profile from '@/modules/common/company-detail/Profile'
import { Tabs, Icon } from 'antd'
import { changeCustomerDetailAction } from '@/modules/customer/action'
import OrderInfo from './OrderInfo'
import WorkList from './WorkList'
import CompanyList from './CompanyList'
import OperateList from './OperateList'
import FlowRecord from './FlowRecord'
import Detail from './detail'
const styles = require('./style')
interface Props {
  type?: 'business' | 'open' | 'customer' | 'signed'
  defaultKey?: string
  customerId?: string
  customerName?: string
  onClose?: () => void
}
class Main extends React.Component<Props> {
  public componentWillMount () {
    this.fetchData()
  }
  public fetchData () {
    changeCustomerDetailAction(this.props.customerId)
  }
  public callback () {
    console.log('11')
  }
  public render () {
    const type = this.props.type
    console.log(this.props.defaultKey, 'this.props.defaultKey')
    return (
      <div style={{ width: '800px'}}>
        <span
          className={styles['colse-icon']}
          onClick={() => this.props.onClose()}
        >
          <Icon type='close' theme='outlined' />
        </span>
        <Profile type={type} isShowAgent={true} customerName={this.props.customerName}/>
        <Tabs defaultActiveKey={this.props.defaultKey} onChange={this.callback}>
          <Tabs.TabPane tab={<span style={{color: 'black'}}>客户信息</span>} key='1'>
            <Detail/>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span style={{color: 'black'}}>订单信息</span>} key='2'>
            <OrderInfo customerId={this.props.customerId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span style={{color: 'black'}}>工单信息</span>} key='3'>
            <WorkList customerId={this.props.customerId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span style={{color: 'black'}}>相关公司</span>} key='4'>
            <CompanyList customerId={this.props.customerId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span style={{color: 'black'}}>跟进小记</span>} key='5'>
            <FlowRecord customerId={this.props.customerId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span style={{color: 'black'}}>操作记录</span>} key='6'>
            <OperateList customerId={this.props.customerId}/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Main

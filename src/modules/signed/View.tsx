import React from 'react'
import Profile from '@/modules/common/company-detail/Profile'
import { Tabs, Icon } from 'antd'
import { changeCustomerDetailAction } from '@/modules/customer/action'
import OrderInfo from './OrderInfo'
import WorkList from './WorkList'
import CompanyList from './CompanyList'
import OperateList from './OperateList'
import Detail from './detail'
const styles = require('./style')
interface Props {
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
    return (
      <div style={{ width: '800px'}}>
        <span
          className={styles['colse-icon']}
          onClick={() => this.props.onClose()}
        >
          <Icon type='close' theme='outlined' />
        </span>
        <Profile isShowAgent={true} customerName={this.props.customerName}/>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <Tabs.TabPane tab='客户信息' key='1'>
            <Detail/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='订单信息' key='2'>
            <OrderInfo customerId={this.props.customerId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='工单信息' key='3'>
            <WorkList customerId={this.props.customerId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='相关公司' key='4'>
            <CompanyList customerId={this.props.customerId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='操作记录' key='5'>
            <OperateList/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Main

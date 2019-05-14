import React from 'react'
import { Layout } from 'antd'
import { Switch } from 'react-router-dom'
import Route from '@/components/Route'
import { Iframe } from 'pilipa-terrace'
import modules from '@/router/modules'
import { fetchConfig } from './api'
const styles = require('@/stylus/main.styl')
const { Content } = Layout
interface State {
  visible: boolean
}
class Main extends React.Component<{}, State> {
  public state: State = {
    visible: false
  }
  public initCloudCall () {
    setInterval(() => {
      APP.fn.jsmcInit(true).catch(() => {
        //
      })
    }, 1000 * 60 * 60 * 2 - 10 * 1000)
    APP.fn.jsmcInit().catch(() => {
      //
    })
  }
  public render () {
    return (
      <Iframe
        env={APP.env}
        content={false}
        type='crm'
        onChange={(user: Common.UserProps) => {
          if (user && APP.user === undefined) {
            fetchConfig().then(([res]) => {
              if (res.status === 200 && res.data) {
                APP.user.tqType = res.data.tqType
                /** 初始化云呼叫 */
                if (APP.user.tqType === 1) {
                  this.initCloudCall()
                }
              }
              this.setState({
                visible: true
              })
            })
            APP.user = user
          }
        }}
      >
        {this.state.visible && <Switch>
          <Content className={styles['con-index']}>
            <Route hidden={!APP.hasPermission('crm_sale_board')} path='/sale-board' component={modules.SaleBoard} />
          </Content>
          <Content className='content'>
            <Route hidden={!APP.hasPermission('crm_customer_list')} path='/customer' component={modules.Customer} />
            <Route hidden={!APP.hasPermission('customer-pool-distribution')} path='/already-allocated-customer' component={modules.AlreadyAllocatedCustomer} />
            <Route hidden={!APP.hasPermission('crm_business_mine')} path='/business' component={modules.Business} />
            <Route hidden={!APP.hasPermission('crm_business_appointment')} path='/appointment' component={modules.Appointment} />
            <Route hidden={!APP.hasPermission('crm_sign_myself')} path='/signed' component={modules.Signed} />
            <Route hidden={!APP.hasPermission('crm_sea_manage')} path='/open' component={modules.Open} />
            <Route hidden={!APP.hasPermission('crm_data_call')} path='/shout' exact component={modules.Shout} />
            <Route hidden={!APP.hasPermission('crm_data_call_detail')} path='/shout/detail' component={modules.Shout} />
            <Route hidden={!APP.hasPermission('crm_data_work')} path='/workpanel-sales' component={modules.WorkpanelSales} />
            <Route hidden={!APP.hasPermission('crm_data_business')} path='/business-analysis' component={modules.BusinessAnalysis} />
            <Route hidden={!APP.hasPermission('crm_data_customer')} path='/customer-sign' component={modules.CustomerSign} />
            <Route path='/performance' component={modules.Performance} />
            {/* <Route hidden={!APP.hasPermission('crm_set_customer')} path='/customer-set/index' component={modules.CustomerSet} /> */}
            <Route hidden={!APP.hasPermission('crm_set_customer')} path='/customer-set/index' component={modules.CustomerSet} />
            <Route hidden={!APP.hasPermission('crm_set_customer_diversion')} path='/customer-set/assign' component={modules.CustomerSetAssign} />
          </Content>
        </Switch>}
      </Iframe>
    )
  }
}
export default Main

import React from 'react'
import { Switch } from 'react-router-dom'
import Route from '@/components/Route'
import { Iframe } from 'pilipa-terrace'
import modules from '@/router/modules'
import { fetchEnum, fetchConfig } from './api'
interface State {
  visible: boolean
}
class Main extends React.Component<{}, State> {
  public state: State = {
    visible: false
  }
  public render () {
    return (
      <Iframe
        env={APP.env}
        type='crm'
        onChange={(user: Common.UserProps) => {
          if (user && APP.user === undefined) {
            fetchConfig().then(([res]) => {
              if (res.status === 200 && res.data) {
                APP.user.tqType = res.data.tqType
              }
              this.setState({
                visible: true
              })
            })
            APP.user = user
            if (APP.user.enableTq !== false) {
              setInterval(() => {
                APP.fn.jsmcInit(true).catch(() => {
                  //
                })
              }, 1000 * 60 * 60 * 2 - 10 * 1000)
              APP.fn.jsmcInit().catch(() => {
                //
              })
            }
          }
        }}
      >
        {this.state.visible && <Switch>
          <Route hidden={!APP.hasPermission('crm_customer_list')} path='/customer' component={modules.Customer} />
          <Route hidden={!APP.hasPermission('customer-pool-distribution')} path='/already-allocated-customer' component={modules.AlreadyAllocatedCustomer} />
          <Route hidden={!APP.hasPermission('crm_business_mine')} path='/business' component={modules.Business} />
          <Route hidden={!APP.hasPermission('crm_business_appointment')} path='/appointment' component={modules.Appointment} />
          <Route hidden={!APP.hasPermission('crm_sign_myself')} path='/signed' component={modules.Signed} />
          <Route hidden={!APP.hasPermission('crm_sea_manage')} path='/open' component={modules.Open} />
          <Route path='/shout' hidden={!APP.hasPermission('crm_data_call')} component={modules.Shout} />
          <Route path='/workpanel-sales' hidden={!APP.hasPermission('crm_data_work')} component={modules.WorkpanelSales} />
          <Route path='/business-analysis' hidden={!APP.hasPermission('crm_data_business')} component={modules.BusinessAnalysis} />
          <Route path='/customer-sign' hidden={!APP.hasPermission('crm_data_customer')} component={modules.CustomerSign} />
          <Route path='/performance' component={modules.Performance} />
          <Route hidden={!APP.hasPermission('crm_set_customer')} path='/customer-set/index' component={modules.CustomerSet} />
          <Route hidden={!APP.hasPermission('crm_set_customer_diversion')} path='/customer-set/assign' component={modules.CustomerSetAssign} />
          <Route path='/setting' component={modules.Setting} />
        </Switch>}
      </Iframe>
    )
  }
}
export default Main

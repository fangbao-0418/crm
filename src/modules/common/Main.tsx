import React from 'react'
import { Switch } from 'react-router-dom'
import Route from '@/components/Route'
import Iframe from 'pilipa-terrace/libs/iframe'
import modules from '@/router/modules'
import { fetchEnum } from './api'
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
        token={APP.token}
        onChange={(user) => {
          if (user && APP.user === undefined) {
            fetchEnum().then(() => {
              this.setState({
                visible: true
              })
            })
          }
          APP.user = user
        }}
      >
        {this.state.visible && <Switch>
          <Route hidden={!APP.hasPermission('crm_customer_list')} path='/customer' component={modules.Customer} />
          <Route hidden={!APP.hasPermission('crm_business_mine')} path='/business' component={modules.Business} />
          <Route hidden={!APP.hasPermission('crm_business_appointment')} path='/appointment' component={modules.Appointment} />
          <Route hidden={!APP.hasPermission('crm_sign_myself')} path='/signed' component={modules.Signed} />
          <Route hidden={!APP.hasPermission('crm_sea_manage')} path='/open' component={modules.Open} />
          <Route path='/shout' component={modules.Shout} />
          <Route hidden={!APP.hasPermission('crm_set_customer')} path='/customer-set/index' component={modules.CustomerSet} />
          <Route hidden={!APP.hasPermission('crm_set_customer_diversion')} path='/customer-set/assign' component={modules.CustomerSetAssign} />
        </Switch>}
      </Iframe>
    )
  }
}
export default Main

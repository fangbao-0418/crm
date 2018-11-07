import React from 'react'
import { connect } from 'react-redux'
import Route from '@/components/Route'
import Iframe from 'pilipa-terrace/libs/iframe'
import modules from '@/router/modules'
class Main extends React.Component<Common.Props> {
  public render () {
    return (
      <Iframe
        env={APP.env}
        token={APP.token}
        onChange={(user) => {
          APP.user = user
        }}
      >
        <Route hidden={!APP.hasPermission('track_work_order')} path='/workorder/list' component={modules.WorkorderList}/>
        <Route path='/workorder/show/:id' component={modules.WorkorderShow}/>
      </Iframe>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.common
})(Main)

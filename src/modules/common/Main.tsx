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
        <Route hidden={!APP.hasPermission('bizbase_log')} path='/' component={modules.OperateLog} exact />
        <Route path='/detail/:id' component={modules.OperateLogDetail}/>
      </Iframe>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.common
})(Main)

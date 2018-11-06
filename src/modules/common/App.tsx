import React from 'react'
import Main from '@/modules/common/Main'
import { LocaleProvider } from 'antd'
import { Switch, Route } from 'react-router-dom'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import modules from '@/router/modules'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect, DispatchProp } from 'react-redux'
interface Props extends RouteComponentProps<any>, DispatchProp<any>, Common.Props {}
class App extends React.Component<Props> {
  public componentWillMount () {
    APP.history = this.props.history
    APP.dispatch = this.props.dispatch
  }
  public render () {
    return (
      <LocaleProvider locale={zhCN}>
        <Switch>
          <Route path='/login' component={modules.Login} />
          <Route path='/logout' component={modules.Logout} />
          <Route path='/check' />
          {
            this.props.visible && <Main></Main>
          }
        </Switch>
      </LocaleProvider>
    )
  }
}
export default withRouter(connect((state: Reducer.State) => {
  return state.common
})(App))

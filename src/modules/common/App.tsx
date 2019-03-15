import React from 'react'
import Main from '@/modules/common/Main'
import { LocaleProvider, Table } from 'antd'
import { Switch, Route } from 'react-router-dom'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect, DispatchProp } from 'react-redux'
import Test from './test'
interface Props extends RouteComponentProps<any>, DispatchProp<any>, Common.Props {}
Table.defaultProps.locale = {
  emptyText: '暂无数据'
}
class App extends React.Component<Props> {
  public componentWillMount () {
    APP.history = this.props.history
    APP.dispatch = this.props.dispatch
  }
  public render () {
    return (
      <LocaleProvider locale={zhCN}>
        <Switch>
          <Route path='/check' />
          <Route path='/test' component={Test}/>
          <Main></Main>
        </Switch>
      </LocaleProvider>
    )
  }
}
export default withRouter(connect((state: Reducer.State) => {
  return {}
})(App))

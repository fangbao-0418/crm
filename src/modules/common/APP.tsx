import React from 'react'
import Main from './Main'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect, DispatchProp } from 'react-redux'
interface Props extends RouteComponentProps<any>, DispatchProp<any> {}
class App extends React.Component<Props> {
  public componentWillMount () {
    APP.history = this.props.history
    APP.dispatch = this.props.dispatch
  }
  public render () {
    return (
      <LocaleProvider locale={zhCN}>
        <Main></Main>
      </LocaleProvider>
    )
  }
}
export default withRouter(connect()(App))

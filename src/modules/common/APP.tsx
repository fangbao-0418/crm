import React from 'react'
import Main from './Main'
import { RouteComponentProps, withRouter } from 'react-router'
type Props = RouteComponentProps<any>
class App extends React.Component<Props> {
  public componentWillMount () {
    APP.history = this.props.history
  }
  public render () {
    return (
      <div>
        <Main></Main>
      </div>
    )
  }
}
export default withRouter(App)

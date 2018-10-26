import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
class Main extends React.Component<RouteComponentProps<{}>> {
  public componentWillMount () {
    console.log(this.props.location.pathname, 'this.props.location.pathname')
    if (APP.homepage !== '/' && this.props.location.pathname === '/') {
      APP.history.push(APP.homepage)
    }
  }
  public render () {
    return (
      <div>
        首页
      </div>
    )
  }
}
export default withRouter(Main)

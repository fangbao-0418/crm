import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
class Main extends React.Component<RouteComponentProps<{}>> {
  public componentWillMount () {
    if (APP.homepage !== '/' && window.location.pathname === '/') {
      window.location.href = APP.homepage
    }
  }
  public render () {
    return (
      <div>
      </div>
    )
  }
}
export default withRouter(Main)

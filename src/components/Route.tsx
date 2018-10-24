import React from 'react'
import { Route, RouteProps } from 'react-router'
import _ from 'lodash'
interface Props extends RouteProps {
  hidden?: boolean
}
class Main extends React.Component<Props> {
  public render () {
    const props: Props = _.cloneDeep(this.props)
    props.hidden = props.hidden !== undefined ? props.hidden : false
    if (props.hidden) {
      return null
    }
    return (
      <Route {...props} />
    )
  }
}
export default Main

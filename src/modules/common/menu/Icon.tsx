import React from 'react'
import classNames from 'classnames'
const styles = require('./style')
interface Props {
  type: 'bussiness' | 'open' | 'customer' | 'sign' | 'set' | 'center' | 'agency' | 'user' | 'worker' | 'message' | 'task' | 'tasktpl' | 'perform' | 'data'
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <span className={classNames(styles['menu-icon'], styles[`menu-icon-${this.props.type}`])}></span>
    )
  }
}
export default Main

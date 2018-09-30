import React from 'react'
import classNames from 'classnames'
const styles = require('./style')
interface Props {
  type: 'bussiness' | 'open'
}
class Main extends React.Component<Props> {
  public render () {
    console.log(styles[`menu-icon-${this.props.type}`], 'xxx')
    return (
      <span className={classNames(styles['menu-icon'], styles[`menu-icon-${this.props.type}`])}></span>
    )
  }
}
export default Main

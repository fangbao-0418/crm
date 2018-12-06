import React from 'react'
import classNames from 'classnames'
const styles = require('./style')
class Main extends React.Component<Icon.Props> {
  public render () {
    const width = this.props.size || 14
    const height = this.props.size || 14
    const style = Object.assign({}, {
      width,
      height
    }, this.props.style)
    return (
      <span
        style={style}
        className={classNames(styles.icon, styles[this.props.type], this.props.className)}
        {...this.props}
      />
    )
  }
}
export default Main

import React from 'react'
import classNames from 'classnames'
interface Props {
  title?: string
  active?: boolean
  onClick?: () => void
}
const styles = require('./style')
class Main extends React.Component<Props> {
  public render () {
    const active = this.props.active
    return (
      <span
        className={classNames(styles.tag, {[styles.active]: active})}
        onClick={() => {
          if (this.props.onClick) {
            this.props.onClick()
          }
        }}
      >
        {this.props.title}
      </span>
    )
  }
}
export default Main

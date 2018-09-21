import React from 'react'
import classNames from 'classnames'
interface Props {
  title?: string
}
const styles = require('./style')
class Main extends React.Component<Props> {
  public state = {
    active: false
  }
  public render () {
    return (
      <span
        className={classNames(styles.tag, {[styles.active]: this.state.active})}
        onClick={() => {
          this.setState({
            active: !this.state.active
          })
        }}
      >
        {this.props.title}
      </span>
    )
  }
}
export default Main

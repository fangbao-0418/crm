import React from 'react'
import Top from './Top'
import classNames from 'classnames'
const styles = require('./style')
interface Props {
  title: any
  rightCotent?: any
  className?: string
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <Top
          title={this.props.title}
          rightContent={this.props.rightCotent}
        />
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Main

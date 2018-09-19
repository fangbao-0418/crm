import React from 'react'
import Top from './Top'
const styles = require('./style')
interface Props {
  title: any
  rightCotent?: any
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className={styles.container}>
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

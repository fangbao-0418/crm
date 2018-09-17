import React from 'react'
import Top from './Top'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.container}>
        <Top />
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Main

import React from 'react'
const styles = require('@/stylus/card')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.title}>基本信息</span>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Main

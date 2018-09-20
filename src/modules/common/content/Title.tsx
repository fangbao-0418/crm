import React from 'react'
const styles = require('./style')
export default class extends React.Component {
  public render () {
    return (
      <div className={styles.tip}>
        <span>基本信息</span>
      </div>
    )
  }
}

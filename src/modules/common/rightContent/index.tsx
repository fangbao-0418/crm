import React from 'react'
const styles = require('./index')
class Main extends React.Component {
  public render () {
    return (
      <div>
        <span className={styles.add}></span>
        <span>新增</span>
      </div>
    )
  }
}
export default Main
import React from 'react'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.top}>
        <div className={styles.title}>我的预约</div>
      </div>
    )
  }
}
export default Main

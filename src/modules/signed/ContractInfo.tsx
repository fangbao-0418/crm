import React from 'react'
import classNames from 'classnames'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.con}>
        <div>小规模记账*12</div>
        <div>
          <span className={classNames(styles.small, styles.black)}>¥</span>
          <span className={classNames(styles.big, styles.black)}>3600.00</span>
          <span  className={classNames(styles.small, styles.gray)}>¥2400</span>
          <div className={styles.line}></div>
        </div>
      </div>
    )
  }
}
export default Main

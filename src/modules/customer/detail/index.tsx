import React from 'react'
import Profile from '@/modules/common/company-detail/Profile'
import BaseInfo from '@/modules/customer/BaseInfo'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Profile />
          <BaseInfo />
        </div>
        <div className={styles.left}>

        </div>
      </div>
    )
  }
}
export default Main

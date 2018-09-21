import React from 'react'
import Profile from '@/modules/common/company-detail/Profile'
import BaseInfo from '@/modules/customer/BaseInfo'
import Card from '@/components/Card'
import { Button } from 'antd'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Profile />
          <Card
            showFold
            rightContent={(
              <Button type='primary'>
                保存
              </Button>
            )}
          >
            <BaseInfo />
          </Card>
        </div>
        <div className={styles.left}>

        </div>
      </div>
    )
  }
}
export default Main

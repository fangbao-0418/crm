import React from 'react'
import Profile from '@/modules/common/company-detail/Profile'
import BaseInfo from '@/modules/customer/BaseInfo'
import Record from '@/modules/customer/Record'
import Card from '@/components/Card'
import Tags from '@/components/tags'
import { Button } from 'antd'
const styles = require('./style')
interface Props {
  customerId: string
  isOpen?: boolean
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Profile />
          <Card
            title='基本信息'
            showFold
          >
            <BaseInfo customerId={this.props.customerId}/>
          </Card>
          {
            !this.props.isOpen &&
            <Card title='跟进记录'>
              <Tags className='mb10'/>
              <Tags />
            </Card>
          }
        </div>
        <div className={styles.right}>
          <Record/>
        </div>
      </div>
    )
  }
}
export default Main

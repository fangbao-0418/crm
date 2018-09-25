import React from 'react'
import AccountInfo from './AccountInfo'
import BusinessInfo from './BusinessInfo'
import BaseInfo from './BaseInfo'
import Card from '@/components/Card'
class Main extends React.Component {
  public render () {
    return (
      <div>
        <Card title='基本信息'>
          <BaseInfo />
        </Card>
        <Card title='工商信息'>
          <BusinessInfo />
        </Card>
        <Card title='财务信息'>
          <AccountInfo />
        </Card>
      </div>
    )
  }
}
export default Main

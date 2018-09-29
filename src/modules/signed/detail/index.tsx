import React from 'react'
import AccountInfo from './AccountInfo'
import BusinessInfo from './BusinessInfo'
import BaseInfo from './BaseInfo'
import LinkMan from './LinkMan'
import Card from '@/components/Card'
import { Form, Icon } from 'antd'
const styles = require('./style')
class Main extends React.Component {
  public state = {
    editable: false
  }
  public render () {
    return (
      <div className={styles.container}>
        <Card
          title='工商信息'
          rightContent={(
            <Icon
              className='href'
              type='edit'
              theme='outlined'
              onClick={() => {
                this.setState({
                  editable: !this.state.editable
                })
              }}
            />
          )}
        >
          <BusinessInfo editable={this.state.editable} />
        </Card>
        <Card
          title='基本信息'
        >
          <BaseInfo editable={this.state.editable} />
        </Card>
        <Card
          title='联系方式'
        >
          <LinkMan />
        </Card>
        <Card title='财务信息'>
          <AccountInfo />
        </Card>
      </div>
    )
  }
}
export default Main

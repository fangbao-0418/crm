import React from 'react'
import BusinessInfo from './BusinessInfo'
import BaseInfo from './BaseInfo'
import LinkMan from './LinkMan'
import Card from '@/components/Card'
import AddButton from '@/modules/common/content/AddButton'
import { Form, Icon, Button } from 'antd'
import { connect } from 'react-redux'
const styles = require('./style')
interface Props {
  linkMan: Customer.LinkManProps[]
}
class Main extends React.Component<Props> {
  public state = {
    editable: false
  }
  public addLinkMan () {
    const linkMan = this.props.linkMan
    linkMan.push({
      contactPerson: '',
      contactPhone: ''
    })
    APP.dispatch({
      type: 'change customer data',
      payload: {
        linkMan
      }
    })
  }
  public render () {
    return (
      <div className={styles.container}>
        <Card
          title='工商信息'
          rightContent={(
            <Icon
              className='href'
              type={this.state.editable ? 'save' : 'edit'}
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
          rightContent={(
            <AddButton
              onClick={this.addLinkMan.bind(this)}
            />
          )}
        >
          <LinkMan />
        </Card>
        <div className='text-right mt20'>
          <Button className='mr5'>取消</Button>
          <Button type='primary'>保存</Button>
        </div>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)

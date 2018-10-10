import React from 'react'
import BusinessInfo from './BusinessInfo'
import BaseInfo from './BaseInfo'
import LinkMan from '@/modules/common/link-man'
import Card from '@/components/Card'
import AddButton from '@/modules/common/content/AddButton'
import { Form, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { updateCustomer } from '@/modules/customer/api'
const styles = require('./style')
interface Props {
  linkMan: Customer.LinkManProps[]
  detail: Customer.DetailProps
}
class Main extends React.Component<Props> {
  public state = {
    disabled: true
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
  public save () {
    const id = this.props.detail.id
    if (this.state.disabled) {
      return
    }
    updateCustomer(id, this.props.detail).then(() => {
      APP.success('保存成功')
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
              type={!this.state.disabled ? 'save' : 'edit'}
              theme='outlined'
              onClick={() => {
                this.setState({
                  disabled: !this.state.disabled
                }, () => {
                  this.save()
                })
              }}
            />
          )}
        >
          <BusinessInfo disabled={this.state.disabled} />
        </Card>
        <Card
          title='基本信息'
        >
          <BaseInfo disabled={this.state.disabled} />
        </Card>
        <Card
          title='联系方式'
          rightContent={(
            <AddButton
              onClick={this.addLinkMan.bind(this)}
            />
          )}
        >
          <LinkMan disabled={this.state.disabled} />
        </Card>
        {/* <div className='text-right mt20'>
          <Button className='mr5'>取消</Button>
          <Button type='primary'>保存</Button>
        </div> */}
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)

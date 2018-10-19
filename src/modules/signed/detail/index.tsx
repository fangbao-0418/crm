import React from 'react'
import BusinessInfo from './BusinessInfo'
import BaseInfo from './BaseInfo'
import LinkMan from './LinkMan'
import Card from '@/components/Card'
import AddButton from '@/modules/common/content/AddButton'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { updateCustomer } from '@/modules/customer/api'
import moment from 'moment'
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
      contactPhone: '',
      source: 1
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
    if (this.state.disabled === false) {
      return
    }
    console.log(this.props.detail, 'this.props.detail.id')
    if (!this.props.detail.customerName) {
      APP.error('请输入公司名称！')
      return
    }
    if (this.props.detail.legalPersonCard.length > 18) {
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
          rightContent={!this.state.disabled && (
            <AddButton
              onClick={this.addLinkMan.bind(this)}
            />
          )}
        >
          <LinkMan disabled={this.state.disabled} />
        </Card>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)

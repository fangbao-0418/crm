import React from 'react'
import classNames from 'classnames'
import { mobilCallNewTab } from './api'
const styles = require('./style')
interface Props {
  phone: string
  name: string
  detail: Customer.DetailProps
  style?: React.CSSProperties
  canCall?: boolean
}
class Main extends React.Component<Props> {
  public makeCall () {
    if (!this.props.canCall) {
      APP.error('联系电话请保存后,再拨打!')
      return
    }
    if (!/[\d-]{5,13}/.test(this.props.phone)) {
      APP.error('无效电话号码!')
      return
    }
    let phone = this.props.phone
    if (phone.length <= 8) {
      phone = APP.user.tqAreaCode + phone
    }
    const payload = {
      customerId: this.props.detail.id,
      customerName: this.props.detail.customerName,
      contactPhone: phone,
      contactName: this.props.name
    }
    mobilCallNewTab(payload).then(() => {
      APP.success('操作成功，请注意手机接听。')
    })
  }
  public render () {
    return (
      <div
        style={this.props.style}
        className={classNames(styles.tel)}
        onClick={() => {
          this.makeCall()
        }}
      >
      </div>
    )
  }
}
export default Main

import React from 'react'
import classNames from 'classnames'
import { makeCall, calledCallBack } from '../api'
const styles = require('./style')
interface Props {
  phone: string
  name: string
  detail: Customer.DetailProps
  style?: React.CSSProperties
}
let init = false
let el: Element
let hangup = true
let params = {
  callerId: '',
  customerId: '',
  customerName: '',
  contactPhone: '',
  contactName: ''
}
class Main extends React.Component<Props> {
  public el: Element
  public constructor (props: Props) {
    super(props)
    if (init === false && APP.user.enableTq !== false) {
      APP.jsmc.monitorEvent('callEvent', (message: any, jsonObject: any) => {
        // call_state agent_hangup/caller_hangup：座席/客户挂机
        console.log(message)
        if (['agent_hangup'].indexOf(message.call_event.call_state) > -1) {
          calledCallBack({
            callerId: message.call_event.call_id,
            customerId: params.customerId,
            customerName: params.customerName,
            contactPhone: params.contactPhone,
            contactName: params.contactName
          })
          APP.error('呼叫终止')
        }
        if (['agent_hangup', 'caller_hangup'].indexOf(message.call_event.call_state) > -1) {
          hangup = true
          el.setAttribute('class', `${styles.tel} ${styles.disabled}`)
        }
      })
      init = true
    }
  }
  public makeCall () {
    const payload = {
      customerId: this.props.detail.id,
      customerName: this.props.detail.customerName,
      contactPhone: this.props.phone,
      contactName: this.props.name
    }
    makeCall(payload)
  }
  public render () {
    if (APP.user.enableTq === false) {
      return null
    }
    return (
      <div
        style={this.props.style}
        className={classNames(styles.tel, styles.disabled)}
        onClick={(e: any) => {
          if (!/[\d-]{5, 13}/.test(this.props.phone)) {
            APP.error('无效电话号码!')
            return
          }
          if (!APP.isConfigTQ) {
            APP.error('呼叫账号配置不存在')
            return
          }
          if (hangup === false) {
            APP.error('忙线中')
            return
          }
          let phone = this.props.phone
          if (phone.length <= 8) {
            phone = APP.user.tqAreaCode + phone
          }
          el = e.target
          params = {
            callerId: '',
            customerId: this.props.detail.id,
            customerName: this.props.detail.customerName,
            contactPhone: this.props.phone,
            contactName: this.props.name
          }
          APP.fn.makecall(phone).then(() => {
            hangup = false
            el.setAttribute('class', `${styles.tel}`)
          })
        }}
      >
      </div>
    )
  }
}
export default Main

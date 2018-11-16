import React from 'react'
import classNames from 'classnames'
import { makeCall } from '../api'
const styles = require('./style')
interface Props {
  phone: string
  name: string
  detail: Customer.DetailProps
  style?: React.CSSProperties
}
let init = false
class Main extends React.Component<Props> {
  public constructor (props: Props) {
    super(props)
    if (init === false) {
      console.log('init')
      APP.fn.jsmcInit()
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
    return (
      <div
        style={this.props.style}
        className={classNames(styles.tel, styles.disabled)}
        onClick={(e) => {
          const el: any = e.target
          APP.fn.makecall(this.props.phone).then(() => {
            el.setAttribute('class', `${styles.tel}`)
            APP.jsmc.monitorEvent('callEvent', (message: any, jsonObject: any) => {
              // call_state agent_hangup/caller_hangup：座席/客户挂机
              console.log(message, jsonObject, 'call event')
              if (['agent_hangup', 'caller_hangup'].indexOf(message.call_event.call_state) > -1) {
                APP.error('呼叫终止')
                el.setAttribute('class', `${styles.tel} ${styles.disabled}`)
              }
            })
          })
        }}
      >
      </div>
    )
  }
}
export default Main

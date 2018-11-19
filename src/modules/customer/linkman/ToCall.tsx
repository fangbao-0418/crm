import React from 'react'
import classNames from 'classnames'
import { makeCall, fetchTQconfig } from '../api'
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
class Main extends React.Component<Props> {
  public el: Element
  public constructor (props: Props) {
    super(props)
    if (init === false) {
      setInterval(() => {
        APP.fn.jsmcInit(true).catch(() => {
          //
        })
      }, 1000 * 60 * 60 * 2 - 10 * 1000)
      APP.fn.jsmcInit().catch(() => {
        //
      })
      APP.jsmc.monitorEvent('callEvent', (message: any, jsonObject: any) => {
        // call_state agent_hangup/caller_hangup：座席/客户挂机
        console.log(message, this.props, 'call event')
        if (['caller_hangup'].indexOf(message.call_event.call_state) > -1) {
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
    return (
      <div
        style={this.props.style}
        className={classNames(styles.tel, styles.disabled)}
        onClick={(e: any) => {
          if (hangup === false) {
            APP.error('忙线中')
            return
          }
          el = e.target
          APP.fn.makecall(this.props.phone).then(() => {
            hangup = false
            console.log(e.target, el, 'ok')
            el.setAttribute('class', `${styles.tel}`)
          })
        }}
      >
      </div>
    )
  }
}
export default Main

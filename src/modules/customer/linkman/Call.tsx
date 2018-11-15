import React from 'react'
import classNames from 'classnames'
import { makeCall } from '../api'
const styles = require('./style')
interface Props {
  phone: string
  name: string
  detail: Customer.DetailProps
}
class Main extends React.Component<Props> {
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
        className={classNames(styles.tel)}
        onClick={(e) => {
          // this.makeCall()
          // APP.success('拨打成功')
          const el: any = e.target
          if (el.className.split(' ').indexOf(styles.disabled) > -1) {
            el.setAttribute('class', `${styles.tel}`)
            APP.fn.makecall(this.props.phone)
          } else {
            el.setAttribute('class', `${styles.tel} ${styles.disabled}`)
          }
        }}
      >
      </div>
    )
  }
}
export default Main

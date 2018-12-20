import React from 'react'
import { Tooltip, Icon } from 'antd'
import Modal from 'pilipa/libs/modal'
import classNames from 'classnames'
import { fetchOrders } from '../api'
const styles = require('./style')
interface Props {
  customerId: string
}
interface States {
  length: any[]
  numb: any[]
  OrderData: Array<{
    isRenewalAble: boolean
    orderCode: string
    createTime: string
    salerName: string
    status: number
    startDate: string
    endDate: string
    amount: number
    remark: string
    products?: Array<{
      productName: string
      quantity: number
      productSalePrice: string
    }>
  }>
}
const stat: any = {
  1: '待支付',
  2: '支付中',
  3: '已支付',
  4: '服务中',
  5: '服务完成',
  6: '待审核',
  7: '已取消',
  8: '已关闭'
}
class Main extends React.Component<Props> {
  public state: States = {
    length: [],
    numb: [],
    OrderData: []
  }
  public componentDidMount () {
    fetchOrders(this.props.customerId).then((res) => {
      this.setState({
        OrderData: res.data ? res.data.records : []
      }, () => {
        const { OrderData } = this.state
        const len: any = []
        const num: any = []
        OrderData.map((value, index) => {
          len.push(Math.ceil(value.products.length / 4))
          num.push(1)
        })
        this.setState({
          length:len,
          numb:num
        })
      })
    })
  }

  public render () {
    const {numb, length} = this.state

    return (
      <div style={{overflowY: 'auto', maxHeight: 600}}>
        {
          this.state.OrderData.map((item, index) => {
            return (
              <div
                className={!!APP.hasPermission('order_orders_service') ? classNames(styles.order, 'clear') : classNames(styles.ord, 'clear')}
                key={index}
                onClick={() => {
                  if (!APP.hasPermission('order_orders_service')) {
                    return
                  }
                  window.open(`/shop-order/orders/service/detail/${item.orderCode}`)
                }}
              >
                <div className={classNames(styles['order-info'])}>
                  <div className={classNames(styles.com)}>
                    <Tooltip
                      placement='top'
                      title={
                        <span>
                          <span style={{display: 'block'}}>订单备注：</span>
                          <span>{item.remark}</span>
                        </span>
                      }
                    >
                      <i className='fa fa-info-circle ml10' style={{color: '#C9C9C9'}}></i>
                    </Tooltip>
                  </div>
                  <div className={styles.col}>
                    <label>订单号：</label>
                    <span>
                      {item.orderCode}
                    </span>
                  </div>
                  <div className={styles.col}>
                    <label>签单时间：</label>
                    <span>{item.createTime}</span>
                  </div>
                  <div className={styles.col}>
                    <label>签单人：</label>
                    <span>{item.salerName}</span>
                  </div>
                  <div className={styles.col}>
                    <label>状态：</label>
                    <span>{stat[item.status]}</span>
                  </div>
                  {/* <div className={styles.col}>
                    <label>服务账期：</label>
                    <span>{item.startDate}-{item.endDate}</span>
                  </div> */}
                </div>
                <div className={styles.marg}>
                  {
                    !(numb[index] === 1) ?
                    <div
                      className={styles.left}
                      onClick={() => {
                        const i = numb[index] - 1
                        numb[index] = i
                        this.setState({
                          numb
                        })
                      }}
                    >
                    <Icon type='left' theme='outlined' />
                    </div> : null
                  }
                  <div className={styles['order-con']}>
                    {
                      item.products.filter((children, index1) => index1 >= ((numb[index] - 1) * 4) && index1 < (numb[index] * 4)).map((children, index1) => {
                        return (
                          <div className={styles.con} key={index1}>
                            <div>{children.productName}*{children.quantity}</div>
                            <div>
                              <span>¥</span>
                              <span className={classNames(styles.big)}>{children.productSalePrice}</span>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                  {
                    !(numb[index] === length[index]) ?
                    <div
                      className={styles.right}
                      onClick={() => {
                        const i = numb[ index ] + 1
                        numb[ index ] = i
                        this.setState({
                          numb
                        })
                      }}
                    >
                    <Icon type='right' theme='outlined'/>
                    </div> : null
                  }
                </div>
                <div className={styles['order-bottom']}>
                  <div className={styles.col}>
                    <span>共{item.products.length}个服务</span>
                  </div>
                  <div className={styles.col}>
                    <label>订单金额：</label>
                    <span>{item.amount}</span>
                  </div>
                </div>
                <div className={styles['order-footer']} style={!!item.isRenewalAble ? {display: 'block'} : {display: 'none'}}>
                  <span
                    onClick={() => {
                      if (!APP.hasPermission('order_orders_continue')) {
                        return
                      }
                      window.open(`/shop-order/orders/continue/${item.orderCode}`)
                    }}
                  >
                    发起续签
                  </span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Main

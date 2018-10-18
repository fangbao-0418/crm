import React from 'react'
import { Row, Col, Tooltip, Icon } from 'antd'
import Modal from 'pilipa/libs/modal'
import classNames from 'classnames'
import { fetchOrders } from './api'
const styles = require('./style')
interface Props {
  customerId: string
}
interface States {
  OrderData: Array<{
    orderCode: string
    createTime: string
    salerName: string
    status: number
    serviceStart: string
    serviceEnd: string
    amount: number
    remark: string
    products?: Array<{
      productName: string
      productNum: number
      productSalePrice: string
    }>
  }>
}
class Main extends React.Component<Props> {
  public state: States = {
    OrderData: [{
      orderCode: 'D00120180102001',
      createTime: '2018-10-11',
      salerName: '张三三',
      status: 1,
      serviceStart: '2018-09-10',
      serviceEnd: '2018-11-12',
      amount: 2000,
      remark: '11111',
      products: [{
        productName: '小规模记账',
        productNum: 12,
        productSalePrice: '4800.00'
      }]
    }]
  }
  public componentWillMount () {
    // fetchOrders(this.props.customerId).then((res) => {
    //   this.setState({
    //     OrderData: res.data.records
    //   })
    // })
  }
  public render () {
    return (
      <div>
        {
          this.state.OrderData.map((item, index) => {
            return (
              <div className={classNames(styles.order, 'clear')} key={index}>
                <div className={classNames(styles['order-info'])}>
                  <div className={classNames(styles.col, styles.note)}>
                    <Tooltip placement='top' title={item.remark}>
                      注
                    </Tooltip>
                  </div>
                  <div className={styles.col}>
                    <label>订单号：</label>
                    <span>{item.orderCode}</span>
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
                    <span>{item.status}</span>
                  </div>
                  <div className={styles.col}>
                    <label>服务账期：</label>
                    <span>{item.serviceStart}-{item.serviceEnd}</span>
                  </div>
                </div>
                <div className={styles.marg}>
                  <div className={styles.left}>
                    <Icon type='left' theme='outlined' />
                  </div>
                  <div className={styles['order-con']}>
                    {
                      item.products.map((children, index1) => {
                        return (
                          <div className={styles.con} key={index1}>
                            <div>{children.productName}*{children.productNum}</div>
                            <div>
                              <span className={classNames(styles.small, styles.black)}>¥</span>
                              <span className={classNames(styles.big, styles.black)}>{children.productSalePrice}</span>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className={styles.right}>
                    <Icon type='right' theme='outlined' />
                  </div>
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
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Main

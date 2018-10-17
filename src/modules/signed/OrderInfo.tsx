import React from 'react'
import { Row, Col, Tooltip, Icon } from 'antd'
import Modal from 'pilipa/libs/modal'
import classNames from 'classnames'
const styles = require('./style')
class Main extends React.Component {
  public state = {
    remark: '订单备注备注备注'
  }
  public render () {
    return (
      <div>
        <div className={classNames(styles.order, 'clear')}>
          <div className={classNames(styles['order-info'])}>
            <div className={classNames(styles.col, styles.note)}>
              注
              <Tooltip placement='top' title={this.state.remark}>
              </Tooltip>
            </div>
            <div className={styles.col}>
              <label>订单号：</label>
              <span>D00120180102001 </span>
            </div>
            <div className={styles.col}>
              <label>签单销售：</label>
              <span>2018-05-16</span>
            </div>
            <div className={styles.col}>
              <label>签单人：</label>
              <span>张磊</span>
            </div>
            <div className={styles.col}>
              <label>状态：</label>
              <span>正常</span>
            </div>
            <div className={styles.col}>
              <label>服务账期：</label>
              <span>2018.01-2019.01</span>
            </div>
          </div>
          <div className={styles.marg}>
            <div className={styles.left}>
              <Icon type='left' theme='outlined' />
            </div>
            <div className={styles['order-con']}>
              <div className={styles.con}>
                <div>小规模记账*12</div>
                <div>
                  <span className={classNames(styles.small, styles.black)}>¥</span>
                  <span className={classNames(styles.big, styles.black)}>3600.00</span>
                </div>
              </div>
              <div className={styles.con}>
                <div>小规模记账*12</div>
                <div>
                  <span className={classNames(styles.small, styles.black)}>¥</span>
                  <span className={classNames(styles.big, styles.black)}>3600.00</span>
                </div>
              </div>
              <div className={styles.con}>
                <div>小规模记账*12</div>
                <div>
                  <span className={classNames(styles.small, styles.black)}>¥</span>
                  <span className={classNames(styles.big, styles.black)}>3600.00</span>
                </div>
              </div>
              <div className={styles.con}>
                <div>小规模记账*12</div>
                <div>
                  <span className={classNames(styles.small, styles.black)}>¥</span>
                  <span className={classNames(styles.big, styles.black)}>3600.00</span>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <Icon type='right' theme='outlined' />
            </div>
          </div>
          <div className={styles['order-bottom']}>
            <div className={styles.col}>
              <span>共4个服务</span>
            </div>
            <div className={styles.col}>
              <label>订单金额：</label>
              <span>14000.00</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Main

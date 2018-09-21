import React from 'react'
import { Row, Col } from 'antd'
import ContractInfo from './ContractInfo'
import Modal from 'pilipa/libs/modal'
import OrderTable from './OrderTable'
import PayTable from './PayTable'
const styles = require('./style')
class Main extends React.Component {
  public viewContract () {
    const modal = new Modal({
      content: (
        <OrderTable />
      ),
      title: '相关合同',
      footer: null,
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public viewPayInfo () {
    const modal = new Modal({
      content: (
        <PayTable />
      ),
      title: '支付信息',
      footer: null,
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public render () {
    return (
      <div>
        <div className={styles.gray}>
          <Row gutter={12}>
            <Col span={8}>
              <label>订单号：</label>
              <span>D00120180102001 </span>
            </Col>
            <Col span={8}>
              <label></label>
              <span>2018-05-16</span>
            </Col>
            <Col span={8}>
              <label>销售：</label>
              <span>张磊</span>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <label>来源：</label>
              <span>天眼查</span>
            </Col>
            <Col span={8}>
              <label>状态：</label>
              <span>正常</span>
            </Col>
            <Col span={8}>
              <label>服务账期：</label>
              <span>2018.01-2019.01</span>
            </Col>
          </Row>
        </div>
        <div className={styles.marg}>
          <ContractInfo />
          <ContractInfo />
        </div>
        <div>
          <Row>
            <Col span={3}>
              <span>共4个服务</span>
            </Col>
            <Col span={6}>
              <label>订单金额：</label>
              <span>14000.00</span>
            </Col>
            <Col span={6}>
              <label>实收：</label>
              <span>3000.00</span>
            </Col>
            <Col span={9}>
              <span className='fr'>
                <a className='mr40' onClick={this.viewContract.bind(this)}>合同查看</a>
                <a onClick={this.viewPayInfo.bind(this)}>支付查看</a>
              </span>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default Main

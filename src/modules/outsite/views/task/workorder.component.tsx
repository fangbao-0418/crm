/**
 * 工单详情页
 */
import { Row, Col, Modal } from 'antd'
import React from 'react'
import MessageShowModal from '@/modules/workorder/views/show.modal'
import WokerService from '@/modules/workorder/api'
import ContentBox from '@/modules/common/content'
import { withRouter, RouteComponentProps } from 'react-router'
const styles = require('@/modules/workorder/styles/show.styl')
interface Props extends RouteComponentProps<{id: string}> {
  taskid?: string
}
interface State {
  dataSource: any
  modalVisible: boolean
  showData: any
}
class Show extends React.Component<Props, any> {
  public state: State = {
    dataSource: {
      nodeList: [],
      processLogList: []
    },
    modalVisible: false,
    showData: {}
  }
  public componentWillMount () {
    this.getOrderDetail()
  }
    // 获取详情数据
  public getOrderDetail () {
    const taskid = this.props.match.params.id
    WokerService.getOrderDetail(taskid).then((res) => {
      this.setState({
        dataSource: res
      })
    })
  }
  // 查看合同
  public lookContract (item: any) {
    console.log('查看合同')
  }
  public onShow (item: any) {
    WokerService.getUserDetail(item.ownerId).then((res: any) => {
      console.log(JSON.stringify(res))
      this.setState({
        showData: res
      }, () => {
        this.modalShow()
      })
    })
  }
  public onSupervisorShow (item: any) {
    WokerService.getUserDetail(item.supervisorId).then((res: any) => {
      console.log(JSON.stringify(res))
      this.setState({
        showData: res
      }, () => {
        this.modalShow()
      })
    })
  }
  public modalShow () {
    this.setState({
      modalVisible: true
    })
  }
  public modalHide () {
    this.setState({
      modalVisible: false
    })
  }

  public modalHandleOk () {
    this.modalHide()
  }

  public modalHandleCancel () {
    this.modalHide()
  }
  public render () {
    return (
      <div className={styles.container}>
      <ContentBox
        title='工单详情'
        rightCotent={(
          <span className={styles.acts}>
            </span>
        )}
      >
        <Row  className={styles['order-list']}>
        <div className={styles.topTitle}>
        <Col span={4}>工单号:{this.state.dataSource.workNo}</Col>
        </div>
        <div className={styles.topTitle}>
        <Col span={7}>企业名称:{this.state.dataSource.customerName}</Col>
        </div>
        <div className={styles.topTitle}>
        <Col span={4}>开始日期:{this.state.dataSource.startTime}</Col>
        </div>
        </Row>
        <Row >{
            this.state.dataSource.nodeList.map((item: any, index: any) => {
              return(
                <div key={index} className={styles['order-list']} >
                  <Col span={3}  >
                    <div className={styles.node}>
                      {item.name && (<p className={styles.title}>{item.name}</p>)}
                      {item.labelOwner && (<p className={styles.des}>{item.labelOwner}:
                          <a  onClick={() => { this.onShow.bind(this)(item) }}>
                            {item.ownerName}
                          </a>
                        </p>)}
                      {item.labelSupervisor && (<p className={styles.des}>{item.labelSupervisor}:
                        <a  onClick={() => { this.onSupervisorShow.bind(this)(item) }}>
                            {item.supervisorName}
                          </a>
                        </p>)}
                      {item.labelDate && (<p className={styles.des}>{item.labelDate}:{item.operateDate}</p>)}
                      {item.status && (<p className={styles.des}>{item.status}</p>)}
                      {item.showContract && (<p className={styles['btn-p']}>
                          <a style={{color:'white'}} onClick={() => { this.lookContract.bind(this)(item) }}>
                            查看合同
                          </a>
                      </p>)}
                      {/* {item.showReminder && (<Button  type='primary' className={styles['btn-button']} onClick={() => { this.getRemind.bind(this)(item) }}>催办</Button>)} */}
                    </div>
                  </Col>
                  <Col  span={1} className={styles.arrow}>{}
                      <Row >
                        <div className={styles.right} >
                        <span  className={styles.rightSide}>
                        </span>
                        <span  className={styles.tightR}>
                        </span>
                        </div>
                      </Row>
                  </Col>
                </div>
              )
            })
        }</Row>
        <div className={styles.orderTitle}>工单状态</div>
        <div className={styles.orderState}>{
          this.state.dataSource.processLogList.length !== 0 ?
          (this.state.dataSource.processLogList.map((item: any, index: any) => {
            return(
              <div key={index} className={styles.orderCell}>
                <p className={styles.orderText}>{item.operationTime}</p>
                <p className={styles.orderText}>{item.dataMode}</p>
              </div>
            )
          })) : (
            <div  className={styles.orderCell}>
              <p className={styles.orderText}>暂无</p>
            </div>
          )
        }
        </div>
      </ContentBox>
       <Modal
        title={`人员信息`}
        visible={this.state.modalVisible}
        onOk={this.modalHandleOk.bind(this)}
        onCancel={this.modalHandleCancel.bind(this)}
        footer={null}
       >
        <MessageShowModal data={this.state.showData} />
       </Modal>

      </div>
    )
  }
}
export default withRouter(Show)

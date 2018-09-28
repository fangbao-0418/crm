/**
 * 工单详情页
 */
import { Input, Select, Form, DatePicker, Button, Row, Col, Modal } from 'antd'
import React from 'react'
import { withRouter } from 'react-router'
import HCframe from '@/modules/common/components/HCframe'
import MessageShowModal from '@/modules/workorder/views/show.modal'

const styles = require('../styles/show.styl')
const Option = Select.Option
const { RangePicker } = DatePicker
const data = [
  {
    name:'销售提单', // 节点名称
    showContract: true, // 是否显示合同
    showReminder: false, // 是否显示催办
    labelOwner: '签单销售', // 负责人标签文字
    ownerId: 111111, // 负责人标识
    labelSupervisor:'',
    supervisorId: 0,
    labelDate: '签约时间', // 日期标签文字
    operateDate: '2018年09月25日', // 操作时间
    status: '工单生成' // 当前状态(待审核,审核中)
  }, {
    name: '外勤任务',
    showContract: false,
    showReminder: true,
    labelOwner: '签单销售',
    ownerId: 2222,
    labelSupervisor:'外勤主管',
    supervisorId: 3333,
    labelDate: '完成时间',
    operateDate: '2018年09月25日',
    status: '已分配'
  }
]
const stateData = [
  '王小二 2018/09/02 12:02:01',
  '客户要办理代开公司和国地税申报业务,满意度55%',
  '2018/09/05 15:02:01 由张一鸣进行用户维护',
  '外勤任务状态变为材料已确认',
  '王小二 2018/09/02 12:02:01',
  '客户要办理代开公司和国地税申报业务,满意度55%',
  '2018/09/05 15:02:01 由张一鸣进行用户维护',
  '外勤任务状态变为材料已确认',
  '王小二 2018/09/02 12:02:01',
  '客户要办理代开公司和国地税申报业务,满意度55%',
  '2018/09/05 15:02:01 由张一鸣进行用户维护',
  '外勤任务状态变为材料已确认'
]
interface States {
  modalVisible: boolean,
  personID: string
}
class Show extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      dataSource:{
        id: '1211',
        customerName:'北京爱康鼎科技有限公司',
        workNo:'XX10001',
        startTime:'2018-09-25',
        nodeList:data
      },
      modalVisible: false,
      personID: '',
      stateData,
      showData:{}
    }
  }
  public componentWillMount () {
    // console.log('......', this.props)
  }
  public onShow (item: any) {
    this.modalShow(item)
  }
  public modalShow (showData: any = {}) {
    this.setState({
      modalVisible: true,
      showData
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
    const { size } = this.props
    const state = this.state
    const params = this.props.match.params
    console.log('....', params)

    return (
      <div className={styles.container}>
         <HCframe title='工单详情'>
        <Row  className={styles['order-list']}>
        <div className={styles.topTitle}>
        <Col span={4}>工单号:{this.state.dataSource.id}</Col>
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
                      {item.labelOwner && (<p>{item.labelOwner}:
                          <span className={`likebtn`} onClick={() => { this.onShow.bind(this)(item) }}>
                            {item.ownerId}
                          </span>
                        </p>)}
                      {item.labelSupervisor && (<p>{item.labelSupervisor}:
                        <span className={`likebtn`} onClick={() => { this.onShow.bind(this)(item) }}>
                            {item.supervisorId}
                          </span>
                        </p>)}
                      {item.labelDate && (<p>{item.labelDate}:{item.operateDate}</p>)}
                      {item.status && (<p>{item.status}</p>)}
                      {item.showContract && (<p className={styles['btn-p']}>查看合同</p>)}
                      {item.showReminder && (<Button  type='primary' className={styles['btn-button']}>催办</Button>)}
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
          this.state.stateData.map((item: any, index: any) => {
            return(
              <div key={index}>{this.state.stateData[index]}</div>
            )
          })

        }
        </div>
       </HCframe>
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

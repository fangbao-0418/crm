/**
 * 工单详情页
 */
import { Input, Select, Form, DatePicker, Button, Row, Col } from 'antd'
import React from 'react'
import { withRouter } from 'react-router'
import HCframe from '@/modules/common/components/HCframe'
const styles = require('../styles/show.styl')
const Option = Select.Option
const { RangePicker } = DatePicker
const data = [
  {
    key: 1,
    title: '线上预约',
    onLine_writeName: '李小龙', // 签单销售
    onLine_writeDate: '2018/09/12', // 签约日期
    financial_state: '',
    financial_name: '',
    financial_writeDate: '',
    repair_name: '', // 客户维护-负责销售
    outside_state: '', // 外勤服务-当前状态
    outside_name: '', // 负责人
    outside_manage: '', // 主管
    client_state: '', // 客户咨询
    client_name: '', // 负责客服
    client_complaint_date: '' // 投诉日期
  },
  {
    key: 2,
    title: '财务审核',
    onLine_writeName: '', // 签单销售
    onLine_writeDate: '', // 签约日期
    financial_state: '已通过',
    financial_name: '开发成',
    financial_writeDate: '2018/09/13',
    repair_name: '', // 客户维护-负责销售
    outside_state: '', // 外勤服务-当前状态
    outside_name: '', // 负责人
    outside_manage: '', // 主管
    client_state: '', // 客户咨询
    client_name: '', // 负责客服
    client_complaint_date: '' // 投诉日期
  },
  {
    key: 3,
    title: '客户维护',
    onLine_writeName: '', // 签单销售
    onLine_writeDate: '', // 签约日期
    financial_state: '',
    financial_name: '',
    financial_writeDate: '',
    repair_name: '李一鸣', // 客户维护-负责销售
    outside_state: '', // 外勤服务-当前状态
    outside_name: '', // 负责人
    outside_manage: '', // 主管
    client_state: '', // 客户咨询
    client_name: '', // 负责客服
    client_complaint_date: '' // 投诉日期
  },
  {
    key: 4,
    title: '外勤服务',
    onLine_writeName: '', // 签单销售
    onLine_writeDate: '', // 签约日期
    financial_state: '',
    financial_name: '',
    financial_writeDate: '',
    repair_name: '', // 客户维护-负责销售
    outside_state: '整理资料', // 外勤服务-当前状态
    outside_name: '李一鸣', // 负责人
    outside_manage: '李一鸣', // 主管
    client_state: '', // 客户咨询
    client_name: '', // 负责客服
    client_complaint_date: '' // 投诉日期
  },
  {
    key: 5,
    title: '客户咨询',
    onLine_writeName: '', // 签单销售
    onLine_writeDate: '', // 签约日期
    financial_state: '',
    financial_name: '',
    financial_writeDate: '',
    repair_name: '', // 客户维护-负责销售
    outside_state: '', // 外勤服务-当前状态
    outside_name: '', // 负责人
    outside_manage: '', // 主管
    client_state: '待解决', // 客户咨询
    client_name: '李吉吉', // 负责客服
    client_complaint_date: '2018/09/18' // 投诉日期
  }
]
const stateData = [
  '王小二 2018/09/02 12:02:01',
  '客户要办理代开公司和国地税申报业务,满意度55%',
  '2018/09/05 15:02:01 由张一鸣进行用户维护',
  '外勤任务状态变为材料已确认'
]
class Show extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      dataSource:data,
      stateData : [
        '王小二 2018/09/02 12:02:01',
        '客户要办理代开公司和国地税申报业务,满意度55%',
        '2018/09/05 15:02:01 由张一鸣进行用户维护',
        '外勤任务状态变为材料已确认'
      ]
    }
  }
  public componentWillMount () {
    console.log('......', this.props)
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
        <Col span={4}>工单号:{params.id}</Col>
        </div>
        <div className={styles.topTitle}>
        <Col span={7}>企业名称:北京爱康鼎科技有限公司</Col>
        </div>
        <div className={styles.topTitle}>
        <Col span={4}>开始日期:2018/09/09</Col>
        </div>
        </Row>
        <Row className={styles['order-list']}>{
            this.state.dataSource.map((item: any, index: any) => {
              return(
                 <Col span={4} key={index} >
                  <div className={styles.node}>
                    {item.title && (<p className={styles.title}>{item.title}</p>)}
                    {item.onLine_writeName && (<p>签单销售:{item.onLine_writeName}</p>)}
                    {item.onLine_writeDate && (<p>签约日期:{item.onLine_writeDate}</p>)}
                    {item.financial_state && (<p>当前状态:{item.financial_state}</p>)}
                    {index === 0 && (<p className={styles['btn-p']}>查看合同</p>)}
                    {item.financial_writeDate && (<p>签约日期:{item.financial_writeDate}</p>)}
                    {item.repair_name && (<p>负责销售:{item.repair_name}</p>)}
                    {item.outside_state && (<p>当前状态:{item.outside_state}</p>)}
                    {item.outside_name && (<p>负责人:{item.outside_name}</p>)}
                    {item.outside_manage && (<p>主管:{item.outside_manage}</p>)}
                    {index === 3 && (<Button  type='primary' className={styles['btn-button']}>催办</Button>)}
                    {item.client_state && (<p>当前状态:{item.client_state}</p>)}
                    {item.client_name && (<p>负责客服:{item.client_name}</p>)}
                    {item.client_complaint_date && (<p>投诉日期:{item.client_complaint_date}</p>)}
                  </div>
                 </Col>
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

      </div>
    )
  }
}
export default withRouter(Show)

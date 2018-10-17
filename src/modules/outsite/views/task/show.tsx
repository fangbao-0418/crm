import React from 'react'
import { withRouter } from 'react-router'
import { Modal, Icon, Tabs, Table, Row, Col, Select, Input, Form } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { TaskItem, TaskList } from '@/modules/outsite/types/outsite'
import { Button } from 'antd'
import SearchForm from '@/modules/outsite/components/SearchForm'
import HCframe from '@/modules/common/components/HCframe'
import Service from '@/modules/outsite/services'
import WokerService from '@/modules/workorder/api'

import Workorder from '@/modules/outsite/views/task/workorder.component'

const styles = require('../../styles/list.styl')

const data: TaskList = [
  {
    id: 1,
    code: '0001',
    name: '测试1',
    category: 'tax',
    customerName: '客户名称',
    contacter: '联系人',
    subList: [
      {
        id: 2,
        code: '0001',
        name: '测试1',
        category: 'tax',
        customerName: '客户名称',
        contacter: '联系人',
        subList: [

        ],
        status: 'complete',
        areaName: '华东',
        userName: '外勤'
      }
    ],
    orderNo: 'sdf123123123',
    status: 'complete',
    areaName: '华东',
    userName: '外勤',
    startTime: '2018-09-12 18:23',
    endTime: '2018-09-12 18:23'
  }
]

const trackdata: any = [
  {
    userName: '李小龙',
    createTime: '2018-09-12',
    content: '拉丝机的反馈垃圾收代理费卡世纪东方去玩儿群翁日期我二群翁日期我二了静安寺两地分居阿里山的叫法是两地分居我去问破日去外婆俄日缷'
  },
  {
    userName: '李小龙',
    createTime: '2018-09-12',
    content: '拉丝机的反馈垃圾收代理费卡世纪东方去玩儿群翁日期我二群翁日期我二了静安寺两地分居阿里山的叫法是两地分居我去问破日去外婆俄日缷'
  },
  {
    userName: '李小龙',
    createTime: '2018-09-12',
    content: '拉丝机的反馈垃圾收代理费卡世纪东方去玩儿群翁日期我二群翁日期我二了静安寺两地分居阿里山的叫法是两地分居我去问破日去外婆俄日缷'
  },
  {
    userName: '李小龙',
    createTime: '2018-09-12',
    content: '拉丝机的反馈垃圾收代理费卡世纪东方去玩儿群翁日期我二群翁日期我二了静安寺两地分居阿里山的叫法是两地分居我去问破日去外婆俄日缷'
  },
  {
    userName: '李小龙',
    createTime: '2018-09-12',
    content: '拉丝机的反馈垃圾收代理费卡世纪东方去玩儿群翁日期我二群翁日期我二了静安寺两地分居阿里山的叫法是两地分居我去问破日去外婆俄日缷'
  },
  {
    userName: '李小龙',
    createTime: '2018-09-12',
    content: '拉丝机的反馈垃圾收代理费卡世纪东方去玩儿群翁日期我二群翁日期我二了静安寺两地分居阿里山的叫法是两地分居我去问破日去外婆俄日缷'
  },
  {
    userName: '李小龙',
    createTime: '2018-09-12',
    content: '拉丝机的反馈垃圾收代理费卡世纪东方去玩儿群翁日期我二群翁日期我二了静安寺两地分居阿里山的叫法是两地分居我去问破日去外婆俄日缷'
  }
]

interface States {
  modalTitle: string,
  modalVisible: boolean,
  dataSource: TaskList,
  selectedRowKeys: string[],
  showData?: any // 弹出层的数据
  pageConf?: any
}
interface ColProps extends TaskItem {
  dataIndex: string
  title: string
}

// 列表
class Main extends React.Component<any> {
  public state: any = {
    modalTitle: '',
    modalVisible: false,
    modalAllotVisible: false, // 审批分配
    modalCancelVisible: false, // 审批取消
    modalVoucherVisible: false, // 查看凭证
    modalChangeVisible: false, // 转交他人
    dataSource: [],
    selectedRowKeys: [],
    pageConf: {
      currentPage: 1,
      total: 1,
      pageSize: 10
    },
    taskid: '',  // 工单id
    auditTaskName: '', // 审批任务的名称
    auditTaskReason: '', // 审批任务的原因
    imageUrl:''  // 凭证的图片
  }
  public taskid: any
  public childTaskid: any
  public tabList: any = [
    {key: '1', name: '待分配'},
    {key: '2', name: '已分配'},
    {key: '3', name: '已完成'}
  ]
  public columns: any = [{
    title: '序列号ID',
    dataIndex: 'id',
    render: (key: any, item: TaskItem) => {
      return <span>{item.id}</span>
    }
  }, {
    title: '子任务名称',
    dataIndex: 'name',
    render: (k: any, item: TaskItem) => {
      return (
      <>
        {item.name}
      </>)
    }
  }, {
    title: '当前外勤人员',
    dataIndex: 'userName',
    render: (k: any, item: TaskItem) => {
      return (
      <>
        <span>{item.userName}</span>
      </>)
    }
  }, {
    title: '所属区域',
    dataIndex: 'orgName',
    render: (k: any, item: TaskItem) => {
      return (
      <>
        <span>{item.areaName}</span>
      </>)
    }
  }, {
    title: '开始时间',
    dataIndex: 'startTime',
    render: (k: any, item: TaskItem) => {
      return (
        <span>{item.startTime}</span>
      )
    }
  }, {
    title: '结束时间',
    dataIndex: 'endTime',
    render: (k: any, item: TaskItem) => {
      return (
        <span>{item.endTime}</span>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (k: any, item: TaskItem) => {
      return (
        <span>
          <span className={`likebtn`} onClick={() => { this.onAuditTask.bind(this)(item) }}>审批</span>
          <span className={`likebtn ${item.status === '1' ? '' : 'likebtn-disabled'}`} onClick={() => { this.showChangeModal.bind(this)(item) }}>转接任务</span>
          <span className={`likebtn`} onClick={() => { this.showVoucherModal.bind(this)(item) }}>查看凭证</span>
        </span>
      )
    }
  }]

  public constructor (props: any, state: any) {
    super({})
  }

  public componentWillMount () {
    this.taskid = this.props.match.params.id
    this.getList()
    Service.getLogByTaskid('1').then((res: any) => {
      console.log('跟进日志', res)
    })
  }

  public componentDidMount () {
  }

  // 全选反选
  public onSelectAllChange (selectedRowKeys: any) {
    console.log('select')
    this.setState({selectedRowKeys})
  }

  public virData () {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const item = data[0]
    ids.map((id: number) => {
      item.id = id
      data.push(item)
    })
  }

  // 获取列表数据
  public getList () {
    // this.virData()
    // this.setState({
    //   dataSource: data
    // })

    Service.getItemByTaskid(1).then((d: any) => {
      console.log('list', d)
      console.log('list', d.subList)
      // const { pageSize, total, currentPage } = d
      this.setState({
        dataSource: d.subList,
        orderId: d.orderId
        // pageConf: {
        //   pageSize,
        //   total,
        //   currentPage
        // }
      }, () => {
        console.log('........', this.state)
      })
    })

  }

  // 查看
  public onShow (item: TaskItem) {
    console.log('show::', item)
  }

  // 删除
  public onDel (item: TaskItem) {
    console.log('del::', item)
  }

  // 搜索
  public onSearch (values: any) {
    console.log('search::', values)
  }

  // 批量分配
  public onMultiAllot () {
    const { selectedRowKeys } = this.state
    if (!selectedRowKeys.length) {
      return
    }
    console.log('list::', selectedRowKeys)
    // service.delList(selectedRowKeys)
  }

  // 审批任务的弹层
  public onAuditTask (record: any) {
    const { selectedRowKeys } = this.state
    console.log('审批任务record：：：：：：：：：', record)
    // service.setReadedList(selectedRowKeys)
    this.childTaskid = record.id
    this.setState({
      modalCancelVisible: true,
      auditTaskName: record.name,
      auditTaskReason: record.cancelReason
    })
  }

  // 审批子任务的确定
  public onAuditItem (item: TaskItem) {
    console.log('audit item::', item)
    const params: any = {
      id: this.childTaskid ,
      status:'CANCELAPPROVE'
    }
    Service.AuditTaskSure(params).then((res: any) => {
      console.log('审批任务确定', res)
    })
  }

  // 转接任务
  public onChangeUser (item: TaskItem) {
    console.log('change user item::', item)
  }

  // 查看凭证确定
  public onShowVoucher (item: TaskItem) {
    this.setState({
      modalVoucherVisible: false
    })
  }

  // tab切换
  public onTabChange (key: string) {
    console.log('tab change::', arguments)
    // this.getList() // 不同状态参数
  }

  // Modals
  // 审批弹层
  public showAuditModal () {
    console.log('audit modal::show')
    this.setState({
      modalAuditVisible: true
    })
  }
  public hideAuditModal () {
    this.setState({
      modalAuditVisible: false
    })
  }

  // 查看凭证弹层
  public showVoucherModal (record: any) {
    console.log('查看凭证的弹层：：：：：：', record)
    this.setState({
      modalVoucherVisible: true,
      imageUrl: record.imageUrl || 'https://www.baidu.com/img/bd_logo1.png'
    })
  }
  public hideVoucherModal () {
    this.setState({
      modalVoucherVisible: false
    })
  }

  // 审批任务取消
  public showCancelModal () {
    console.log('cancel modal::show')
    this.setState({
      modalCancelVisible: true
    })
  }
  public hideCancelModal () {
    this.setState({
      modalCancelVisible: false
    })
  }

  // 批量分配
  public showAllotModal () {
    console.log('allot modal::show')
    this.setState({
      modalAllotVisible: true
    })
  }
  public hideAllotModal () {
    this.setState({
      modalAllotVisible: false
    })
  }
  // 切换人员
  public onMultiChange () {
    console.log('分配人员：', arguments)
  }

  // 转接任务
  public showChangeModal () {
    console.log('change modal show')
    this.setState({
      modalChangeVisible: true
    })
  }
  public hideChangeModal () {
    this.setState({
      modalChangeVisible: false
    })
  }
  // 切换人员
  public onChangeChange () {
    console.log('转接任务：', arguments)
  }

  public render () {
    const searchPorps = {
      onSearch: this.onSearch.bind(this)
    }
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
    <div className={styles.container}>
      <HCframe title='客户的名称在这里显示'>
        <Row>
          <Tabs defaultActiveKey='sublist' onChange={this.onTabChange}>
              <Tabs.TabPane key={`sublist`} tab={'任务详情'}>
                <Table
                  columns={this.columns}
                  dataSource={this.state.dataSource}
                  rowSelection={rowSelection}
                  bordered
                  pagination={false}
                  rowKey={'id'}
                />
                <div className={styles['bottom-btns']}>
                  <Button type='primary' onClick={this.showAllotModal.bind(this)}>批量分配</Button>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane key={`tracklog`} tab={'跟进小计'}>
                <div className={styles.trackbox}>
                {
                  trackdata.map((item: any, index: number) => {
                    return (
                    <div className={styles.trackitem} key={`trackitem-${index}`}>
                      <div><em>{item.userName}</em><span>{item.createTime}</span></div>
                      <p>{item.content}</p>
                    </div>)
                  })
                }
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane key={`workorder`} tab={'工单详情'}>
                <div>
                  <Workorder data={{taskid: this.state.orderId}} />
                </div>
              </Tabs.TabPane>
          </Tabs>
        </Row>
      </HCframe>

      <Modal
        title='批量分配'
        visible={this.state.modalAllotVisible}
        onOk={this.onMultiAllot.bind(this)}
        onCancel={this.hideAllotModal.bind(this)}
      >
      <div className={styles.modalbox}>
        <Select style={{width: '100%'}} placeholder='选择分配的外勤' onChange={this.onMultiChange.bind(this)}>
          <Select.Option key='a'>冻豆腐</Select.Option>
          <Select.Option key='b'>冻豆腐</Select.Option>
          <Select.Option key='c'>冻豆腐</Select.Option>
        </Select>
      </div>
      </Modal>

      <Modal
        title='审核取消'
        visible={this.state.modalCancelVisible}
        onOk={this.onAuditItem.bind(this)}
        onCancel={this.hideCancelModal.bind(this)}
      >
      <div className={`${styles.modalbox} ${styles.cancelbox}`}>
            <p>{`确定取消“${this.state.auditTaskName}”在内及后继子任务？`}</p>
        <div className={`${styles.cancelcont}`}>{`原因： ${this.state.auditTaskReason}`}</div>
      </div>
      </Modal>

      <Modal
        title='查看凭证'
        visible={this.state.modalVoucherVisible}
        onOk={this.onShowVoucher.bind(this)}
        onCancel={this.hideVoucherModal.bind(this)}
      >
      <div className={`${styles.modalbox} ${styles.voucherbox}`}>
        <img
          src={`${this.state.imageUrl}`}
        />
      </div>
      </Modal>

      <Modal
        title='转接任务'
        visible={this.state.modalChangeVisible}
        onOk={this.onChangeUser.bind(this)}
        onCancel={this.hideChangeModal.bind(this)}
      >
        <span>分配：</span>
        <Select style={{width: '50%'}} onChange={this.onChangeChange.bind(this)}>
          <Select.Option key='1'>李小龙</Select.Option>
          <Select.Option key='2'>李连杰</Select.Option>
          <Select.Option key='3'>成龙</Select.Option>
        </Select>
      </Modal>
    </div>
    )
  }
}
export default withRouter(Main)

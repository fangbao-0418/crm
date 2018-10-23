import React from 'react'
import monent, { Moment } from 'moment'
import { Divider, Modal, Tabs, Table, Row, Col } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { TaskItem, TaskList } from '@/modules/outsite/types/outsite'
import SearchForm from '@/modules/outsite/components/SearchForm'
import ContentBox from '@/modules/common/content'
import Service from '@/modules/outsite/services'
import classNames from 'classnames'
const styles = require('@/modules/outsite/styles/list')
const data: TaskList = [
  {
    id: 1,
    name: '测试1',
    category: 'tax',
    customerName: '客户名称',
    contacter: '联系人',
    subList: [
      {
        id: 2,
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
    startTime: '2018-09-12 18:23'
  }
]

interface States {
  modalTitle: string,
  modalVisible: boolean,
  dataSource: TaskList,
  selectedRowKeys: string[],
  showData?: any, // 弹出层的数据
  pageConf?: any,
  searchData?: any,
  currentItem?: any,
  tab?: string // 当前tab标签
}
interface ColProps extends TaskItem {
  dataIndex: string
  title: string
}

// 列表
class Main extends React.Component {
  public state: States = {
    modalTitle: '',
    modalVisible: false,
    currentItem: {},
    dataSource: [],
    selectedRowKeys: [],
    pageConf: {
      currentPage: 1,
      total: 1,
      pageSize: 10
    },
    searchData: {
      pageSize: 10,
      currentPage: 1,
      customerName: '',
      name: '',
      templeteId: '',
      subId: '',
      userId: '',
      status: 'UNDISTRIBUTED', // 待分配
      startTime: '',
      orgId: ''
    },
    tab: 'UNDISTRIBUTED' // 当前tab, 用于过滤搜索框的状态列表
  }
  public tabList: any = [
    {key: 'UNDISTRIBUTED', name: '待分配'},
    {key: 'DISTRIBUTED', name: '已分配'},
    {key: 'FINISHED', name: '已完成'}
  ]
  public taskIcoMap: any = {
    CANCELPENDING: {
      text: '消',
      className: 'xiao'
    },
    xxx: {
      text: '催',
      className: 'cui'
    },
    REJECTPENDING: {
      text: '驳',
      className: 'bo'
    }
  }
  public columns: any = [{
    title: '订单号',
    dataIndex: 'orderNo',
    render: (key: any, item: TaskItem) => {
      return <span>{item.orderNo}</span>
    }
  }, {
    title: '客户名称',
    dataIndex: 'customerName',
    render: (k: any, item: TaskItem) => {
      const { status } = item
      let icoConf = this.taskIcoMap[status]
      icoConf = icoConf ? icoConf : { text: '', className: styles.icohide}
      return (
      <>
        <span className={`${styles.taskico} ${icoConf.className}`}><i>{icoConf.text}</i></span>
        <span className={`likebtn`} onClick={this.onShow.bind(this, item)}>{item.customerName}</span>
      </>)
    }
  }, {
    title: '联系人',
    dataIndex: 'userName',
    render: (k: any, item: TaskItem) => {
      return (
      <>
        <span>{item.userName}</span>
      </>)
    }
  }, {
    title: '所属区域',
    dataIndex: 'areaName',
    render: (k: any, item: TaskItem) => {
      return (
      <>
        <span>{item.areaName}</span>
      </>)
    }
  }, {
    title: '服务状态',
    dataIndex: 'status',
    render: (k: any, item: TaskItem) => {
      return (
      <>
        <span>{Service.taskStatusDict[item.status]}</span>
      </>)
    }
  }, {
    title: '任务名称',
    dataIndex: 'name',
    render: (k: any, item: TaskItem) => {
      return (
      <>
        <span>{item.name}</span>
      </>)
    }
  }, {
    title: '当前子任务',
    dataIndex: 'subtask',
    render: (k: any, item: TaskItem) => {
      return (
        <span>{item.subList.length && item.subList[0].name}</span>
      )
    }
  }, {
    title: '子任务状态',
    dataIndex: 'subtaskStatus',
    render: (k: any, item: TaskItem) => {
      return (
        <span>{item.subList.length && Service.subStatusDict[item.subList[0].status]}</span>
      )
    }
  }, {
    title: '当前外勤人员',
    dataIndex: 'sublistUsername',
    render: (k: any, item: TaskItem) => {
      return (
        <span>{item.subList.length && item.subList[0].userName}</span>
      )
    }
  }, {
    // title: '第一个子任务点击开始时间', // @181018 产品修改为 接受任务时间
    title: '创建时间',
    dataIndex: 'startTime',
    render: (k: any, item: TaskItem) => {
      return (
        <span>{item.startTime}</span>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (k: any, item: TaskItem) => {
      const { status } = item
      const act = Service.getActionByStatus(status)
      const canAudit = act ? true : false
      return (
        <span>
          <span className={`likebtn ${canAudit ? '' : 'likebtn-disabled'}`} onClick={() => { this.showAuditModal.bind(this)(item) }}>审批</span>
          <Divider type='vertical' />
          <span className={`likebtn`} onClick={() => { this.onShow.bind(this)(item) }}>查看</span>
        </span>
      )
    }
  }]

  public constructor (props: any, state: any) {
    super({})
  }

  public componentWillMount () {
    this.getList()
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
    /*
    this.virData()
    this.setState({
      dataSource: data
    })
    */
    const { searchData } = this.state
    Service.getListByCond(searchData).then((d: any) => {
      const { pageSize, total, pageCurrent } = d
      this.setState({
        dataSource: d.records,
        pageConf: {
          pageSize,
          total,
          pageCurrent
        },
        searchData: {
          ...searchData,
          pageSize,
          pageCurrent
        }
      }, () => {
        console.log('........', this.state)
      })
    })
  }

  // 查看
  public onShow (item: TaskItem) {
    console.log('show::', item)
    APP.history.push(`/outsite/task/show/${item.id}`)
  }

  // 标记已读
  public onRead (item: TaskItem) {
    console.log('read::', item)
  }

  // 删除
  public onDel (item: TaskItem) {
    console.log('del::', item)
  }

  // 搜索
  public onSearch (searchData: any) {
    console.log('-------::', searchData)
    if (!searchData.status) {
      searchData.status = this.state.tab
    }
    console.log('search::', this.state.tab, searchData)
    this.setState({
      searchData
    }, () => {
      this.getList()
    })
  }

  // 搜索 日期切换
  public onDateChange (date: Moment, dateString: string) {
    console.log('date change::', date)
  }

  // 批量删除
  public delList () {
    const { selectedRowKeys } = this.state
    if (!selectedRowKeys.length) {
      return
    }
    console.log('del list::', selectedRowKeys)
    // service.delList(selectedRowKeys)
  }

  // 批量标记为已读
  public setReadedList () {
    const { selectedRowKeys } = this.state
    console.log('set readed list::', selectedRowKeys)
    // service.setReadedList(selectedRowKeys)
  }

  // tab切换
  public onTabChange (key: string) {
    console.log('tab change::', key)
    const { searchData } = this.state
    searchData.status = key
    this.setState({
      tab: key,
      searchData
    }, () => {
      this.getList()
    })
    // this.getList() // 不同状态参数
  }

  // 审批弹层
  public showAuditModal (currentItem: TaskItem) {
    const { status } = currentItem
    const act = Service.getActionByStatus(status)
    if (!act) {return}
    console.log('current item::', status, currentItem)
    this.setState({
      currentItem,
      modalVisible: true
    })
  }
  public hideAuditModal () {
    this.setState({
      modalVisible: false
    })
  }

  // 审批
  public audit (rst: 'YES' | 'NO') {
    const { currentItem } = this.state
    const { status } = currentItem
    const act = Service.getActionByStatus(status)
    console.log('audit::', this.state.currentItem.status, rst, act)
    if (!act) {
      this.hideAuditModal()
      return
    }
    Service.auditTaskByTaskidStatus(currentItem.id, status, rst).then((res: any) => {
      this.getList()
      this.hideAuditModal()
    })
  }

  // 导出
  public export () {

  }

  public render () {
    const searchPorps = {
      onSearch: this.onSearch.bind(this)
    }
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    const { currentItem } = this.state
    return (
    <div className={styles.container}>
      <ContentBox
        title='外勤任务'
        rightCotent={<div>
          <span onClick={this.export.bind(this)} className={classNames('href', styles.btn)} ><i></i> 导出</span>
        </div>}
      >
        <Row>
          <Col span={20}>
            <SearchForm parData={this.state} onSearch={this.onSearch.bind(this)} />
          </Col>
        </Row>
        <Row>
          <Tabs defaultActiveKey='UNDISTRIBUTED' onChange={this.onTabChange.bind(this)}>
            {this.tabList.map((item: any) => {
              return (<Tabs.TabPane key={item.key} tab={item.name}>
                <Table
                  columns={this.columns}
                  dataSource={this.state.dataSource}
                  // rowSelection={rowSelection}
                  bordered
                  pagination={this.state.searchData}
                  rowKey={'key'}
                />
              </Tabs.TabPane>)
            })}
          </Tabs>
        </Row>
      </ContentBox>
      <Modal
        title={`审批`}
        visible={this.state.modalVisible}
        onOk={this.audit.bind(this, 'YES')}
        onCancel={this.audit.bind(this, 'NO')}
      >
        <div className={styles.popbox}>
          <div style={{display: currentItem.status === 'CANCELPENDING' ? 'block' : 'none'}}>
            确定取消"{currentItem.name}"在内及后续的子任务？
            <div className={styles.reason}>
              {currentItem.cancelReason}
            </div>
          </div>
          <div style={{display: currentItem.status === 'REJECTPENDING' ? 'block' : 'none'}}>
            确定驳回?
            <div className={styles.reason}>
              {currentItem.approveMsg}
            </div>
          </div>
          <div style={{display: currentItem.status === 'SUBMITED' ? 'block' : 'none'}}>
            {currentItem.name}任务已完成
          </div>
        </div>
      </Modal>
    </div>
    )
  }
}
export default Main

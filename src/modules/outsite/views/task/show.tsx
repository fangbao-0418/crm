import React from 'react'
import { withRouter } from 'react-router'
import { Modal, Icon, Tabs, Table, Row, Col } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { TaskItem, TaskList } from '@/modules/outsite/types/outsite'
import { Button } from 'antd'
import SearchForm from '@/modules/outsite/components/SearchForm'
import HCframe from '@/modules/common/components/HCframe'
import Service from '@/modules/outsite/services'

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
  public state: States = {
    modalTitle: '',
    modalVisible: false,
    dataSource: [],
    selectedRowKeys: [],
    pageConf: {
      currentPage: 1,
      total: 1,
      pageSize: 10
    }
  }
  public taskid: any
  public tabList: any = [
    {key: '1', name: '待分配'},
    {key: '2', name: '已分配'},
    {key: '3', name: '已完成'}
  ]
  public columns: any = [{
    title: '序列号ID',
    dataIndex: 'code',
    render: (key: any, item: TaskItem) => {
      return <span>{item.orderNo}</span>
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
    dataIndex: 'areaName',
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
          <span className={`likebtn`} onClick={() => { this.onAuditItem.bind(this)(item) }}>审批</span>
          <span className={`likebtn`} onClick={() => { this.onChangeUser.bind(this)(item) }}>转接任务</span>
          <span className={`likebtn`} onClick={() => { this.onShowVoucher.bind(this)(item) }}>查看凭证</span>
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
    this.virData()
    this.setState({
      dataSource: data
    })
    /*
    Service.getListByUserid(2).then((d: any) => {
      const { pageSize, total, currentPage } = d
      this.setState({
        dataSource: d.records,
        pageConf: {
          pageSize,
          total,
          currentPage
        }
      }, () => {
        console.log('........', this.state)
      })
    })
    */
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

  // 审批任务
  public onAuditTask () {
    const { selectedRowKeys } = this.state
    console.log('audit task::', this.taskid)
    // service.setReadedList(selectedRowKeys)
  }

  // 审批子任务
  public onAuditItem (item: TaskItem) {
    console.log('audit item::', item)
  }

  // 转接任务
  public onChangeUser (item: TaskItem) {
    console.log('change user item::', item)
  }

  // 查看凭证
  public onShowVoucher (item: TaskItem) {
    console.log('show voucher::', item)
  }

  // tab切换
  public onTabChange (key: string) {
    console.log('tab change::', arguments)
    // this.getList() // 不同状态参数
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
                  pagination={this.state.pageConf}
                  rowKey={'key'}
                />
                <div className={styles['bottom-btns']}>
                  <Button type='primary' onClick={this.onAuditTask.bind(this)}>审批</Button>
                  <Button type='primary' onClick={this.onMultiAllot.bind(this)}>批量分配</Button>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane key={`tracklog`} tab={'跟进小计'}>
                <div>
                  跟进列表
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane key={`workorder`} tab={'工单详情'}>
                <div>
                  工单详情
                </div>
              </Tabs.TabPane>
          </Tabs>
        </Row>
      </HCframe>
    </div>
    )
  }
}
export default withRouter(Main)

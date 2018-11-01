import React from 'react'
import moment, { Moment } from 'moment'
import { Tabs, Table, Row, Col, Tooltip, Icon, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import SearchForm from '@/modules/outsite/components/SearchForm'
import ContentBox from '@/modules/common/content'
import Service from '@/modules/outsite/services'
import classNames from 'classnames'
import { Modal } from 'pilipa'
const styles = require('@/modules/outsite/styles/list')
type TaskItem = OutSide.TaskItem

interface States {
  dataSource: OutSide.TaskItem[],
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
  public columns: ColumnProps<OutSide.TaskItem>[] = [{
    title: '订单号',
    dataIndex: 'orderNo',
    render: (key, item) => {
      return <span>{item.orderNo}</span>
    }
  }, {
    title: '客户名称',
    dataIndex: 'customerName',
    render: (k, item) => {
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
    title: '所属区域',
    dataIndex: 'areaName',
    render: (k, item) => {
      return (
      <>
        <span>{item.areaName}</span>
      </>)
    }
  }, {
    title: '服务状态',
    dataIndex: 'status',
    render: (k, item) => {
      return (
      <>
        <span>{Service.taskStatusDict[item.status]}</span>
      </>)
    }
  }, {
    title: '任务名称',
    dataIndex: 'name',
    render: (k, item) => {
      return (
      <>
        <span>{item.name}</span>
      </>)
    }
  }, {
    title: '当前子任务',
    dataIndex: 'subtask',
    render: (k, item) => {
      return (
        <span>{item.subList.length && item.subList[0].name}</span>
      )
    }
  }, {
    title: '子任务状态',
    dataIndex: 'subtaskStatus',
    render: (k, item) => {
      return (
        <span>{item.subList.length && Service.subStatusDict[item.subList[0].status]}</span>
      )
    }
  }, {
    title: '当前外勤人员',
    dataIndex: 'sublistUsername',
    render: (k, item) => {
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
    title: () => {
      return (
        <Tooltip
          placement='bottomRight'
          title={
            <span>
              置灰：表示没有任何需要审批的任务  高亮：有需要审批的任务，需点击进行审批
            </span>
          }
        >
            操作
            <span className='icon-list'>
              <Icon type='question-circle'/>
            </span>
        </Tooltip>
      )
    },
    dataIndex: 'operation',
    render: (k: any, item: TaskItem) => {
      const { status } = item
      const act = Service.getActionByStatus(status)
      const canAudit = act ? true : false
      return (
        <span>
          <span className={`likebtn ${canAudit ? '' : 'likebtn-disabled'}`} onClick={() => { this.showAuditModal.bind(this)(item) }}>审批</span>
          {/* <Divider type='vertical' />
          <span className={`likebtn`} onClick={() => { this.onShow.bind(this)(item) }}>查看</span> */}
        </span>
      )
    }
  }]
  public componentWillMount () {
    this.getList()
  }

  public componentDidMount () {
  }

  // 全选反选
  public onSelectAllChange (selectedRowKeys: string[]) {
    this.setState({selectedRowKeys})
  }

  // 获取列表数据
  public getList () {
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
    if (searchData.status === undefined) {
      searchData.status = this.state.tab
    }
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
    const modal = new Modal({
      title: '任务审批',
      content: (
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
      ),
      onOk: () => {
        Service.auditTaskByTaskidStatus(currentItem.id, status, 'YES').then((res: any) => {
          this.getList()
          modal.hide()
        })
      },
      onCancel: () => {
        Service.auditTaskByTaskidStatus(currentItem.id, status, 'NO').then((res: any) => {
          this.getList()
          modal.hide()
        })
      }
    })
    modal.show()
  }
  // 导出
  public export () {

  }
  public render () {
    return (
      <ContentBox
        title='外勤任务'
        rightCotent={<div>
          <span onClick={this.export.bind(this)} className={classNames('href', styles.btn)} ><i></i> 导出</span>
        </div>}
      >
        <Row>
          <Col span={20}>
            <SearchForm tab={this.state.tab} onSearch={this.onSearch.bind(this)} />
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
    )
  }
}
export default Main

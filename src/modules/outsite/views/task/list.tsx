import React from 'react'
import monent, { Moment } from 'moment'
import { Modal, Icon, Tabs, Table, Row, Col } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { TaskItem, TaskList } from '@/modules/outsite/types/outsite'
import { Button } from 'antd'
import SearchForm from '@/modules/outsite/components/SearchForm'
import HCframe from '@/modules/common/components/HCframe'
import MessageShowModal from '@/modules/message/views/show.modal'
import Service from '@/modules/outsite/services'

const styles = require('../../styles/list.styl')

const content = `哈哈还多方哈士大夫哈市的合法化撒旦法，
    这里是内容阿萨德法师打发斯蒂芬，放假去玩儿去玩儿去玩儿就开了
    经历会计权威肉铺前无配偶入侵我IE哈还多方哈士大夫哈市的合法化撒旦法，这里是内容阿萨德法师打发斯蒂芬
    ，放假去玩儿去玩儿去玩儿就开了经历会计权威肉铺前无配偶入侵我IE哈还多方哈士大夫哈市的合法化撒旦法，
    这里是内容阿萨德法师打发斯蒂芬，放假去玩儿去玩儿去玩儿就开了经历会计权威肉铺前无配偶入侵我IE哈还多
    方哈士大夫哈市的合法化撒旦法，这里是内容阿萨德法师打发斯蒂芬，放假去玩儿去玩儿去玩儿就开了经历会计
    权威肉铺前无配偶入侵我IE哈还多方哈士大夫哈市的合法化撒旦法，这里是内容阿萨德法师打发斯蒂芬，放假去
    玩儿去玩儿去玩儿就开了经历会计权威肉铺前无配偶入侵我IE还多方哈士大夫哈市的合法化撒旦法，这里是内容
    阿萨德法师打发斯蒂芬，放假去玩儿去玩儿去玩儿就开了经历会计权威肉铺前无配偶入侵我IE`
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
  searchData?: any
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
      userId: '',
      status: 'UNDISTRIBUTED', // 待分配
      startTime: '',
      orgId: ''
    }
  }
  public tabList: any = [
    {key: 'UNDISTRIBUTED', name: '待分配'},
    {key: 'DISTRIBUTED', name: '已分配'},
    {key: 'APPROVED', name: '已完成'}
  ]
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
      return (
      <>
        <span className={item.status ? styles.icohide : styles.icocui}><i>催</i></span>
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
        <span>{item.status}</span>
      </>)
    }
  }, {
    title: '任务名称',
    dataIndex: 'category',
    render: (k: any, item: TaskItem) => {
      return (
      <>
        <span>{item.category}</span>
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
        <span>{item.subList.length && item.subList[0].status}</span>
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
    title: '第一个子任务点击开始时间',
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
      return (
        <span>
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
    Service.getListByCond(this.state.searchData).then((d: any) => {
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
  public onSearch (values: any) {
    console.log('search::', values)
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
      searchData
    }, () => {
      this.getList()
    })
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
      <HCframe title='外勤任务'>
        <Row>
          <Col span={20}>
            <SearchForm initData={this.state.searchData} onSearch={this.onSearch.bind(this)} />
          </Col>
          <Col span={4} style={{textAlign: 'right'}}>
            <span className={styles.acts}>
              <Button size={'small'} onClick={this.delList.bind(this)}>导出</Button>
            </span>
          </Col>
        </Row>
        <Row>
          <Tabs defaultActiveKey='UNDISTRIBUTED' onChange={this.onTabChange.bind(this)}>
            {this.tabList.map((item: any) => {
              return (<Tabs.TabPane key={item.key} tab={item.name}>
                <Table
                  columns={this.columns}
                  dataSource={this.state.dataSource}
                  rowSelection={rowSelection}
                  bordered
                  pagination={this.state.searchData}
                  rowKey={'key'}
                />
              </Tabs.TabPane>)
            })}
          </Tabs>
        </Row>
      </HCframe>
    </div>
    )
  }
}
export default Main

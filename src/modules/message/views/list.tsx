import React from 'react'
import monent, { Moment } from 'moment'
import { Modal, Icon, Table, Row, Col } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { MessageList, MessageItem } from '@/modules/message/types/messge'
import { Button } from 'antd'
import SearchForm from '@/modules/message/components/SearchForm'
import HCframe from '@/modules/common/components/HCframe'
import Msg from '@/modules/message/services/message.tsx'
import MessageShowModal from '@/modules/message/views/show.modal'
import MsgService from '@/modules/message/services'

const styles = require('../styles/list.styl')

const content = `哈哈还多方哈士大夫哈市的合法化撒旦法，
    这里是内容阿萨德法师打发斯蒂芬，放假去玩儿去玩儿去玩儿就开了
    经历会计权威肉铺前无配偶入侵我IE哈还多方哈士大夫哈市的合法化撒旦法，这里是内容阿萨德法师打发斯蒂芬
    ，放假去玩儿去玩儿去玩儿就开了经历会计权威肉铺前无配偶入侵我IE哈还多方哈士大夫哈市的合法化撒旦法，
    这里是内容阿萨德法师打发斯蒂芬，放假去玩儿去玩儿去玩儿就开了经历会计权威肉铺前无配偶入侵我IE哈还多
    方哈士大夫哈市的合法化撒旦法，这里是内容阿萨德法师打发斯蒂芬，放假去玩儿去玩儿去玩儿就开了经历会计
    权威肉铺前无配偶入侵我IE哈还多方哈士大夫哈市的合法化撒旦法，这里是内容阿萨德法师打发斯蒂芬，放假去
    玩儿去玩儿去玩儿就开了经历会计权威肉铺前无配偶入侵我IE还多方哈士大夫哈市的合法化撒旦法，这里是内容
    阿萨德法师打发斯蒂芬，放假去玩儿去玩儿去玩儿就开了经历会计权威肉铺前无配偶入侵我IE`
const data = [
  {
    key: 1,
    createdAt: '2018-09-18',
    sender: {
      uid: '1',
      username: '二日'
    },
    title: '111消息的标题是什么呢',
    readed: false,
    content
  },
  {
    key: 2,
    createdAt: '2018-09-18',
    sender: {
      uid: '2',
      username: '冻豆腐'
    },
    title: '111消息的标题是什么呢',
    readed: true,
    content
  }
]
interface States {
  modalTitle: string,
  modalVisible: boolean,
  dataSource: MessageList,
  chooseDate: string,
  selectedRowKeys: string[],
  showData?: any // 弹出层的数据
  pageConf?: any
}
interface ColProps extends MessageItem {
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
    chooseDate:'',
    pageConf: {
      currentPage: 1,
      total: 1
    }
  }
  public delArr: any = []
  public columns: any = [{
    title: '消息日期',
    dataIndex: 'sendtime',
    render: (key: any, item: MessageItem) => {
      return <span>{item.createdAt}</span>
    }
  }, {
    title: '消息标题',
    dataIndex: 'title',
    render: (k: any, item: MessageItem) => {
      return (
      <>
        <span className={item.read ? styles.icohide : styles.icocui}><i>催</i></span>
        <span className={`likebtn`} onClick={this.onShow.bind(this, item)}>{item.title}</span>
      </>)
    }
  }, {
    title: '催办人',
    dataIndex: 'sender',
    render: (k: any, item: MessageItem) => {
      return (
        <span>{item.sender.username}</span>
      )
    }
  }, {
    title: '当前状态',
    dataIndex: 'status',
    render: (k: any, item: MessageItem) => {
      return (
        <span>{item.read ? '已读' : '未读'}</span>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (k: any, item: MessageItem) => {
      return (
        <span>
          <span className={`likebtn`} onClick={() => { this.onShow.bind(this)(item) }}>查看</span>|
          {item.read ? <span className={`likebtn`} style={{color:'#999'}} >已读</span> : <span className={`likebtn`} onClick={() => this.onRead.bind(this)(item)}>标记为已读</span>}
          <span className={`likebtn`} onClick={() => this.onDel.bind(this)(item)}>删除</span>
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
    /*
    const msg = Msg({})
    msg.evAdd('data', (cd: any) => {
      msg.uiOpen({
        message: '您有新的消息',
        description: <MessageShowModal data={cd} />,
        placement: 'bottomRight'
      })
    })
    // 消息启动
    msg.connect({})
    */
  }

  // 全选反选
  public onSelectAllChange (selectedRowKeys: any) {
    console.log('select')
    this.setState({selectedRowKeys})
  }

  // 获取列表数据
  public getList () {
    const {pageConf, chooseDate} = this.state
    MsgService.getListByUserid('5', chooseDate, pageConf.currentPage, pageConf.pageSize).then((d: any) => {
      this.setState({
        dataSource: d.records,
        pageConf: {
          pageSize: d.pageSize,
          total: d.pageTotal,
          currentPage: d.pageCurrent
        }
      })
    })
  }

  // 查看
  public onShow (item: MessageItem) {
    console.log('show::', item)
    this.modalShow(item.title, item)
  }

  // 标记已读
  public onRead (item: MessageItem) {
    console.log('read::', item)
    const tempArr = []
    tempArr.push(item.id)
    MsgService.readListByIds(tempArr).then((d: any) => {
      this.getList()
    })
  }

  // 删除
  public onDel (item: MessageItem) {
    const tempArr = []
    tempArr.push(item.id)
    MsgService.delListByIds(tempArr).then((d: any) => {
      this.getList()
    })
  }

  // 搜索
  public onSearch (values: any) {
    console.log('search::', values)
  }

  // 搜索 日期切换
  public onDateChange (date: Moment, dateString: string) {
    console.log('date change::', date.format('YYYY-MM-DD'))
    this.setState({
      chooseDate:date.format('YYYY-MM-DD')
    }, () => {
      this.getList()
    })
  }

  // 批量删除
  public delList () {
    const { selectedRowKeys, dataSource} = this.state
    if (!selectedRowKeys.length) {
      return
    }
    const tempArr: any = []
    selectedRowKeys.map((item: any, index: any) => {
      tempArr.push(dataSource[item].id)
    })
    console.log('del list::', tempArr)
    MsgService.delListByIds(tempArr).then((d: any) => {
      this.setState({
        selectedRowKeys:[]
      }, () => {
        this.getList()
      })
    })
  }

  // 批量标记为已读
  public setReadedList () {
    const { selectedRowKeys, dataSource} = this.state
    if (!selectedRowKeys.length) {
      return
    }
    const tempArr: any = []
    selectedRowKeys.map((item: any, index: any) => {
      tempArr.push(dataSource[item].id)
    })
    console.log('read list::', tempArr)
    MsgService.readListByIds(tempArr).then((d: any) => {
      this.setState({
        selectedRowKeys:[]
      }, () => {
        this.getList()
      })
    })
  }
  // 分页
  public pageChange = (pageIndex: any) => {
    console.log('pageIndex : ', pageIndex.current)
    this.setState({
      selectedRowKeys:[],
      pageConf: {
        currentPage: pageIndex.current
      }
    }, () => {
      this.getList()
    })
  }

  public modalShow (title: string = '', showData: any = {}) {
    this.setState({
      modalVisible: true,
      modalTitle: title ? title : this.state.modalTitle,
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
    const searchPorps = {
      onSearch: this.onSearch.bind(this)
    }
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
    <div className={styles.container}>
      <HCframe title='消息列表'>
        <Row>
          <Col span={20}>
            <SearchForm onDateChange={this.onDateChange.bind(this)} />
          </Col>
          <Col span={4} style={{textAlign: 'right'}}>
            <span className={styles.acts}>
              <Button type='primary' onClick={this.setReadedList.bind(this)}>标记为已读</Button>
              <Button onClick={this.delList.bind(this)}>删除</Button>
            </span>
          </Col>
        </Row>
        <Row>
          <Table
            columns={this.columns}
            dataSource={this.state.dataSource}
            rowSelection={rowSelection}
            bordered
            pagination={this.state.pageConf}
            rowKey={'key'}
            onChange={this.pageChange}
          />
        </Row>
      </HCframe>
      <Modal
        // title={this.state.modalTitle}
        title={`消息详情`}
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
export default Main

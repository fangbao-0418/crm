import React from 'react'
import { Tabs, Table, Input, InputNumber } from 'antd'
import { fetchRegion } from '@/modules/common/api'
import ContentBox from '@/modules/common/content'
import Modal from 'pilipa/libs/modal'
import Provider from '@/components/Provider'
import BaseInfo from '@/modules/customer/BaseInfo'
import { PerformList, PerfromItem } from '@/modules/outsite/types/perform'
import PerService from '@/modules/outsite/services/perform'
const TabPane = Tabs.TabPane
const showPath = '@/subform'
const Search = Input.Search
interface States {
  modalTitle: string,
  modalVisible: boolean,
  chooseDate: string,
  dataSource: PerformList,
  spanText: string,
  currentId: number // 当前选中权限id
  selectedRowKeys: string[],
  pageConf?: any
}
interface Info {
  reward: number,
  companyId: number,
  productId: number,
  productName: string,
  productPrice?: any
}
interface ColProps extends PerfromItem {
  dataIndex: string
  title: string
}
function callback (key: string) {
  console.log(key)
}

class Main extends React.Component {
  public state: States = {
    modalTitle: '',
    modalVisible: false,
    selectedRowKeys: [],
    dataSource: [],
    chooseDate:'',
    spanText:'编辑',
    currentId: 0,
    pageConf: {
      current: 1,
      total: 11
    }
  }
  public columns = [{
    title: '任务名称',
    dataIndex: 'name',
    render: (k: any, item: PerfromItem) => {
      return <span>{item.productName}</span>
    }
  }, {
    title: '任务价格',
    dataIndex: 'price',
    render: (k: any, item: PerfromItem) => {
      return <span>{item.productPrice}</span>
    }
  }, {
    title: '绩效额度',
    dataIndex: 'address',
    render: (k: any, item: PerfromItem) => {
      return <span><InputNumber  defaultValue={item.reward} precision={2} onChange={this.onChange} /></span>
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (k: any, item: PerfromItem) => {
      return (
        <span>
          <a style={{color: '#3B91F7'}} onClick={() => { this.onShow.bind(this)(item) }}>{item.status === '200' ? '编辑' : '保存'}</a>
        </span>
      )
    }
  }]
  public onShow (item: PerfromItem) {
    console.log('点击编辑')
    this.setState({ showTitle: '编辑' })
    this.modalShow(item)
  }
  public modalShow (showData: any = {}) {
    this.setState({
      modalVisible: false,
      showData
    })
  }
  // 获取列表数据
  public getList () {
    const {pageConf} = this.state
    PerService.getPerformListByUserid (pageConf.current, pageConf.size).then((d: any) => {
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
  // 修改绩效
  public modifyPerform (val: Info) {
    const {currentId} = this.state
    const {reward} = val
    const updateUser = 111 // todo 改为登陆ID
    PerService.RevisePerformance(currentId, reward).then((res) => {
      this.setState({modalVisible: false})
      this.getList()
    })
  }
  public componentWillMount () {
    this.getList()
  }
  // 新增绩效
  // public addPerform (val: Info) {
  //   const {reward} = val
  //   const {currentId} = this.state
  //   const createUser = 111 // todo 改为登陆ID
  //   PerService.newPerformance(payload).then((res) => {
  //     this.setState({modalVisible: false})
  //     this.getList()
  //   })
  // }

  public add () {
    const modal = new Modal({
      style: 'width: 800px',
      content: (
        <Provider><BaseInfo onClose={() => {modal.hide()}}/></Provider>
      ),
      footer: null,
      title: '新增',
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }

  public callback (key: string) {
    console.log('key', key)
  }
  public onChange (value: any) {
    console.log('changed', value)
  }
  public render () {
    return (
      <ContentBox
        title='绩效配置'
      >
        <div>
          <Search
            placeholder='请输入客户和联系人名称'
            onSearch={(value) => console.log(value)}
            style={{width: 200, marginBottom: '25px'}}
          />
          <Table columns={this.columns} dataSource={this.state.dataSource} size='middle'/>
        </div>
      </ContentBox>
    )
  }
}

export default Main

import React from 'react'
import { Divider, Modal, Table } from 'antd'
import { TaskItem, TaskList } from '@/modules/outsite/types/outsite'
import Service from '@/modules/outsite/services'
import '@/modules/common/styles/base.styl'
import _ from 'lodash'

const showPath = '/outsite/tasktpl/form'

/*路径未修改，跳转编辑系统任务  subform组件中*/
interface States {
  selectedRowKeys: string[]
  modalVisible: boolean,
  searchData: any,
  item: TaskItem,
  dataSource: TaskList,
  pageConf: any
}

function onShowSizeChange (current: any, pageSize: any) {
  console.log(current, pageSize)
}

class Main extends React.Component<any, any> {
  public item: TaskItem = {}
  public state: States = {
    selectedRowKeys: [],
    modalVisible: false,
    item: {},
    pageConf: {
      total: 0,
      size: 10,
      current: 1
    },
    searchData: {
      systemFlag: 1,
      pageCurrent: 1,
      pageSize: 10
    },
    dataSource: []
  }

  public columns = [{
    title: '主任务',
    dataIndex: 'name'
  }, {
    title: '子任务',
    dataIndex: 'subList',
    render: (k: any, item: TaskItem) => {
      if (!item || !item.subList) {
        return
      }
      const data = _.map(item.subList, (subitem: any) => {
        return subitem.name
      })
      return data.join(',')
    }
  }, {
    title: '是否优先',
    dataIndex: 'priority',
    render: (k: any, item: any) => {
      return item.priority === 'OPEN' ? '是' : '否' // Service.taskPriorityDict[item.priority]
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (k: any, item: TaskItem) => {
      return (
      <span>
          <span onClick={this.onShow.bind(this, item)} style={{color: '#3B91F7'}} className='likebtn'>编辑</span>
          <Divider type='vertical' style={{color: '#979797'}}/>
          <span onClick={this.showModal.bind(this, item)} style={{color: '#3B91F7'}} className='likebtn'>解除商品关系</span>
        </span>
      )
    }
  }]
  public data = [{
    key: '1',
    id: 1,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '是',
    operation: '编辑'
  }, {
    key: '2',
    id: 2,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '否',
    operation: '编辑'
  }, {
    key: '3',
    id: 3,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '是',
    operation: '编辑'
  }, {
    key: '4',
    id: 4,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '是',
    operation: '编辑'
  }, {
    key: '5',
    id: 5,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '是',
    operation: '编辑'
  }]

  public componentWillMount () {
    this.getList()
  }

  // 获取列表数据
  public getList () {
    Service.getTplListByCond(this.state.searchData).then((res: any) => {
      if (!res || !res.records) {
        return
      }
      const { pageConf, searchData } = this.state
      searchData.pageSize = pageConf.size = res.pageSize
      searchData.pageCurrent = pageConf.current = res.pageCurrent
      pageConf.total = res.pageTotal
      this.setState({
        dataSource: res.records,
        searchData
      })
    })
  }

  public onShow (item: TaskItem) {
    APP.history.push(`${showPath}/${item.id}`)
  }

  // 解除商品绑定关系
  public onUnbind () {
    console.log('解除绑定：', this.item)
    // this.item.productId = ''
    // this.item.productName = ''
    Service.addTplItem(this.item).then(() => {
      this.hideModal()
      this.getList()
    })
  }

  // 显示确认框
  public showModal (item: any) {
    console.log('show confrim')
    this.setState({
      modalVisible: true
    }, () => {
      this.item = item
    })
  }

  // 隐藏确认框
  public hideModal () {
    this.setState({
      modalVisible: false
    })
  }

  public render () {
    return (
    <div>
      <Table
        columns={this.columns}
        dataSource={this.state.dataSource}
        size='small'
        pagination={{
          ...this.state.pageConf,
          onChange: (page: any) => {
            const { pageConf, searchData } = this.state
            pageConf.current = page
            searchData.pageCurrent = page
            this.setState({
              pageConf,
              searchData
            }, () => {
              this.getList()
            })
          }
        }}
      />
      <Modal
        title='确认信息'
        visible={this.state.modalVisible}
        onOk={this.onUnbind.bind(this)}
        onCancel={this.hideModal.bind(this)}
        okText='确认'
        cancelText='取消'
      >
        确定删除商品关系？
      </Modal>
    </div>
    )
  }
}

export default Main

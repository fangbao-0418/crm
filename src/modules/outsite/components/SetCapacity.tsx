import React from 'react'
import { Table, Modal, Divider } from 'antd'
import _ from 'lodash'
import '@/modules/common/styles/base.styl'
import Service from '@/modules/outsite/services'
type TaskItem = OutSide.TaskItem
const showPath = '/outsite/tasktpl/form'

/*路径未修改，跳转编辑系统任务  subform组件中*/
interface States {
  selectedRowKeys: string[]
  modalVisible: boolean
  searchData: any,
  dataSource: TaskItem[],
  item: TaskItem,
  pageConf: any
}

function onShowSizeChange (current: any, pageSize: any) {
  console.log(current, pageSize)
}

class Main extends React.Component<any, any> {
  public item: any
  public state: States = {
    selectedRowKeys: [],
    pageConf: {
      total: 0,
      size: 10,
      current: 1
    },
    searchData: {
      systemFlag: '0',
      pageCurrent: 1,
      pageSize: 10
    },
    item: {},
    dataSource: [],
    modalVisible: false
  }

  public columns = [{
    title: '主任务',
    dataIndex: 'name'
  }, {
    title: '子任务',
    dataIndex: 'age',
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
    title: '操作',
    dataIndex: 'operation',
    width: 120,
    render: (k: any, item: TaskItem) => {
      return (
      <span>
                    <span onClick={() => {this.onShow.bind(this)(item)}} style={{color: '#1890ff'}} className='likebtn'>编辑</span>
                    <Divider type='vertical' style={{color: '#979797'}}/>
                    <span
                      onClick={() => {this.showDisableModal.bind(this)(item)}}
                      className={`likebtn ${item.status === 'NORMAL' ? 'a' : 'likebtn-disabled'}`}
                    >
                      {item.status === 'NORMAL' ? '禁用' : '启用'}
                    </span>
        </span>
      )
    }
  }]
  public data = [{
    key: '1',
    id: 1,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    operation: '编辑'
  }, {
    key: '2',
    id: 2,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    operation: '编辑'
  }, {
    key: '3',
    id: 3,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    operation: '编辑'
  }, {
    key: '4',
    id: 4,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    operation: '编辑'
  }, {
    key: '5',
    id: 5,
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
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

  // 显示禁用提醒框
  public showDisableModal (item: any) {
    this.setState({
      modalVisible: true,
      item
    })
  }
  public hideDisableModal () {
    this.setState({
      modalVisible: false
    })
  }

  // 禁用
  public onDisable () {
    const { item } = this.state
    item.status = item.status === 'FORBIDDEN' ? 'NORMAL' : 'FORBIDDEN'
    Service.addTplItem(item).then(() => {
      this.getList()
      this.hideDisableModal()
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
        onOk={this.onDisable.bind(this)}
        onCancel={this.hideDisableModal.bind(this)}
        okText='确认'
        cancelText='取消'
      >
        确定{this.state.item.status === 'NORMAL' ? '禁用' : '启用'} {this.state.item.name} 任务吗？
      </Modal>
    </div>
    )
  }
}

export default Main
/*
export default connect((state: Reducer.State) => {
  return {
    ...state.customer
  }
})(Main)
*/

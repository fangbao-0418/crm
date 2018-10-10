import React from 'react'
import { Table, Modal, Divider } from 'antd'
import { connect } from 'react-redux'
import '@/modules/common/styles/base.styl'
import { TaskItem } from '@/modules/outsite/types/outsite'
import Service from '@/modules/outsite/services'

const showPath = '/outsite/tasktpl/form'

/*路径未修改，跳转编辑系统任务  subform组件中*/
interface States {
  selectedRowKeys: string[]
  modalVisible: boolean
}

function onShowSizeChange (current: any, pageSize: any) {
  console.log(current, pageSize)
}

class Main extends React.Component<any, any> {
  public item: any
  public state: States = {
    selectedRowKeys: [],
    modalVisible: false
  }

  public columns = [{
    title: '主任务',
    dataIndex: 'name'
  }, {
    title: '子任务',
    dataIndex: 'age'
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (k: any, item: TaskItem) => {
      return (
      <span>
                    <span onClick={() => {this.onShow.bind(this)(item)}} style={{color: '#1890ff'}} className='likebtn'>编辑</span>
                    <Divider type='vertical' style={{color: '#979797'}}/>
                    <span onClick={() => {this.showDisableModal.bind(this)(item)}} style={{color: '#1890ff'}} className='likebtn'>禁用</span>
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

  public onShow (item: TaskItem) {
    APP.history.push(`${showPath}/${item.id}`)
  }

  // 显示禁用提醒框
  public showDisableModal (item: any) {
    this.setState({
      modalVisible: true
    }, () => {
      this.item = item
    })
  }
  public hideDisableModal () {
    this.setState({
      modalVisible: false
    })
  }

  // 禁用
  public onDisable () {
    console.log('disable item::', this.item)
    this.hideDisableModal()
  }

  public render () {
    return (
    <div>
      <Table
        columns={this.columns}
        dataSource={this.data}
        size='small'
      />
      <Modal
        title='确认信息'
        visible={this.state.modalVisible}
        onOk={this.onDisable.bind(this)}
        onCancel={this.hideDisableModal.bind(this)}
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
/*
export default connect((state: Reducer.State) => {
  return {
    ...state.customer
  }
})(Main)
*/

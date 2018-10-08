import React from 'react'
import { Table } from 'antd'
import { OrderItem } from '../../workorder/types/workorder'

const showPath = '/outsite/tasktpl/subform'

/*路径未修改，跳转编辑系统任务  subform组件中*/
interface States {
  selectedRowKeys: string[]
}

function onShowSizeChange (current: any, pageSize: any) {
  console.log(current, pageSize)
}

class Main extends React.Component<any, any> {
  public state: States = {
    selectedRowKeys: []
  }

  public columns = [{
    title: '主任务',
    dataIndex: 'name'
  }, {
    title: '子任务',
    dataIndex: 'age'
  }, {
    title: '优先级',
    dataIndex: 'address'
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (k: any, item: OrderItem) => {
      return (
      <span>
          <span onClick={() => {this.onShow.bind(this)(item)}} style={{color: '#3B91F7'}}>编辑</span>
          <span className='vsplit'></span>
          <span onClick={() => {this.onUnbind.bind(this)(item)}} style={{color: '#3B91F7'}}>解除商品关系</span>
        </span>
      )
    }
  }]
  public data = [{
    key: '1',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '是',
    operation: '编辑'
  }, {
    key: '2',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '否',
    operation: '编辑'
  }, {
    key: '3',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '是',
    operation: '编辑'
  }, {
    key: '4',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '是',
    operation: '编辑'
  }, {
    key: '5',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    address: '是',
    operation: '编辑'
  }]

  public onShow (item: OrderItem) {
    APP.history.push(`${showPath}/${item.id}`)
  }

  // 解除商品绑定关系
  public onUnbind (item: OrderItem) {
    console.log('取消关联')
  }

  public render () {
    return (
    <Table
      columns={this.columns}
      dataSource={this.data}
      size='small'
    />

    )
  }
}

export default Main

import React from 'react'
import { Table, Divider } from 'antd'
import { connect } from 'react-redux'

const showPath = '/outsite/tasktpl/subform'
import { OrderItem } from '../../workorder/types/workorder'

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
    title: '操作',
    dataIndex: 'operation',
    render: (k: any, item: OrderItem) => {
      return (
      <span>
                    <span onClick={() => {this.onShow.bind(this)(item)}} style={{color: '#1890ff'}}>编辑</span>
                    <Divider type='vertical' style={{color: '#979797'}}/>
                    <span onClick={() => {this.onShow.bind(this)(item)}} style={{color: '#1890ff'}}>禁用</span>
        </span>
      )
    }
  }]
  public data = [{
    key: '1',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    operation: '编辑'
  }, {
    key: '2',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    operation: '编辑'
  }, {
    key: '3',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    operation: '编辑'
  }, {
    key: '4',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    operation: '编辑'
  }, {
    key: '5',
    name: '注册公司',
    age: '1、核名 2、网上申请 3、下发执照 4、刻章',
    operation: '编辑'
  }]

  public onShow (item: OrderItem) {
    APP.history.push(`${showPath}/${item.id}`)
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

export default connect((state: Reducer.State) => {
  return {
    ...state.customer
  }
})(Main)

import React from 'react'
import { Tabs, Table, Input } from 'antd'
import { fetchRegion } from '@/modules/common/api'
import ContentBox from '@/modules/common/content'
import Modal from 'pilipa/libs/modal'
import Provider from '@/components/Provider'
import BaseInfo from '@/modules/customer/BaseInfo'
import { OrderItem } from '@/modules/workorder/types/workorder'

const TabPane = Tabs.TabPane
const showPath = '@/subform'
const Search = Input.Search

function callback (key: string) {
  console.log(key)
}

class Main extends React.Component {

  public columns = [{
    title: '任务名称',
    dataIndex: 'name'
  }, {
    title: '任务价格',
    dataIndex: 'price'
  }, {
    title: '绩效额度',
    dataIndex: 'address'
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (k: any, item: OrderItem) => {
      return (
        <span>
          <span style={{color: '#3B91F7'}}>编辑</span>
        </span>
      )
    }
  }]
  public data = [{
    key: '1',
    name: '注册公司',
    price: 2000.00,
    address: 180
  }, {
    key: '2',
    name: '变更',
    price: 1000.00,
    address: 180
  }, {
    key: '3',
    name: '三方协议',
    price: 2000.00,
    address: 180,
    operation: '编辑'
  }, {
    key: '4',
    name: '国地税报道',
    price: 1000.00,
    address: 180
  }, {
    key: '5',
    name: '注册公司',
    price: 2000.00,
    address: 180
  }, {
    key: '6',
    name: '变更',
    price: 1000.00,
    address: 180
  }, {
    key: '7',
    name: '三方协议',
    price: 2000.00,
    address: 180
  }, {
    key: '8',
    name: '国地税报道',
    price: 1000.00,
    address: 180
  }, {
    key: '9',
    name: '注册公司',
    price: 2000.00,
    address: 180
  }, {
    key: '10',
    name: '变更',
    price: 1000.00,
    address: 180
  }
  ]
  public componentWillMount () {
    fetchRegion().then((res) => {
      console.log(res)
    })
  }

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

  public render () {
    return (
      <ContentBox
        title='绩效配置'
      >
        <div>
          <Search
            placeholder='输入客户和联系人名称'
            onSearch={(value) => console.log(value)}
            style={{width: 200, marginBottom: '25px'}}
          />
          <Table columns={this.columns} dataSource={this.data} size='middle'/>
        </div>
      </ContentBox>
    )
  }
}

export default Main

import React from 'react'
import { Table, Input } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
import { ReducerState } from '@/reducers'
import { CustomerProps } from '@/reducers/customer'
export interface LinkManProps {
  contactPerson: string
  contactPhone: string
  customerSource: string
  mark: string
}
interface Props {
  linkMan: LinkManProps[]
}
interface States {
  dataSource: LinkManProps[]
}
const styles = require('./style')
class Main extends React.Component<Props> {
  public dataSource = [{
    contactPerson: '22',
    contactPhone: '222',
    customerSource: '222',
    mark: '333'
  }]
  public state: States = {
    dataSource: []
  }
  public columns: ColumnProps<LinkManProps>[] = [
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      render: () => {
        return <Input />
      }
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      render: () => {
        return <Input />
      }
    },
    {
      title: '来源',
      dataIndex: 'customerSource',
      render: () => {
        return <Input />
      }
    },
    {
      title: '备注',
      dataIndex: 'mark',
      render: () => {
        return <Input />
      }
    },
    {
      title: '操作',
      width: '80px',
      align: 'center',
      render: () => {
        return (
          <span>删除</span>
        )
      }
    }
  ]
  public render () {
    console.log(this.props.linkMan)
    return (
      <div style={{width: '500px'}}>
        <Table
          dataSource={this.props.linkMan}
          columns={this.columns}
          pagination={false}
          bordered
        />
      </div>
    )
  }
}
export default connect((state: ReducerState) => {
  return {
    ...state.customer
  }
})(Main)

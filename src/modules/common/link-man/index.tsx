import React from 'react'
import { Table } from 'antd'
import { LinkManProps } from './man'
const styles = require('./style')
interface States {
  dataSource: LinkManProps[]
}
class Main extends React.Component {
  public state: States = {
    dataSource: []
  }
  public columns = [
    {
      title: '联系人'
    },
    {
      title: '联系电话'
    },
    {
      title: '来源'
    },
    {
      title: '备注'
    },
    {
      title: '操作'
    }
  ]
  public render () {
    return (
      <div>
        <Table
          columns={this.columns}
        />
      </div>
    )
  }
}
export default Main

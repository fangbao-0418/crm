import React from 'react'
import { Table } from 'antd'
const styles = require('./style')
class Main extends React.Component {
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

import React from 'react'
import { Table } from 'antd'
class Main extends React.Component {
  public columns = [
    {
      title: '特殊资源'
    },
    {
      title: '自定义分配销售'
    },
    {
      title: '操作'
    }
  ]
  public render () {
    return (
      <Table
        bordered
        columns={this.columns}
      />
    )
  }
}
export default Main

import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
const styles = require('./style')
class Main extends React.Component<any> {
  public dataSource = this.props.cityData
  public columns: ColumnProps<CrmStat.TotalByCityDetails>[] = [
    {
      title: '城市排名',
      dataIndex: 'totalByCity.name',
      render: (text, record) => {
        return (
          <span>
            {record.key === this.dataSource[this.dataSource.length - 1].key ? '' : (record.key > 3 ? <span className={styles.ran}>{record.key}</span> : <span className={styles.rank}>{record.key}</span>)}
            <span>{record.name}</span>
          </span>
        )
      }
    },
    {
      title: '新增客户',
      dataIndex: 'totalByCity.value',
      render: (text, record) => {
        return record.value
      }
    }
  ]

  public render () {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          scroll={{y: 300}}
        />
      </div>
    )
  }
}
export default Main

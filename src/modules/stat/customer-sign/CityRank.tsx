import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
const styles = require('./style')

class Main extends React.Component<any> {
  public columns: ColumnProps<CrmStat.TotalByCityDetails>[] = [
    {
      title: '排名',
      width: 300,
      render: (text, record) => {
        return (
          <span>
            {record.key > 3 ? <span className={styles.ran}>{record.key}</span> : <span className={styles.rank}>{record.key}</span>}
          </span>
        )
      }
    },
    {
      title: '城市排名',
      width: 300,
      dataIndex: 'totalByCity.name',
      render: (text, record) => {
        return record.name
      }
    },
    {
      title: '新增客户',
      width: 300,
      dataIndex: 'totalByCity.value',
      render: (text, record) => {
        return record.value
      }
    }
  ]

  public render () {
    return (
      <div className={styles.tab}>
        <Table
          columns={this.columns}
          dataSource={this.props.cityData}
          pagination={false}
        />
      </div>
    )
  }
}
export default Main

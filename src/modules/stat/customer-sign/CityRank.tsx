import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
const styles = require('./style')
interface Props {
  totalByCity?: CrmStat.TotalByCityDetails[]
}
class Main extends React.Component<Props> {
  public columns: ColumnProps<CrmStat.TotalByCityDetails>[] = [
    {
      title: '省份',
      width: '35%',
      dataIndex: 'totalByCity.provinceName',
      render: (text, record, index) => {
        return (
          <span>
            {index > 2 ? <span className={styles.ran}>{record.key}</span> : <span className={styles.rank}>{record.key}</span>}
            <span>{record.provinceName}</span>
          </span>
        )
      }
    },
    {
      title: '机构',
      width: '40%',
      dataIndex: 'totalByCity.name',
      render: (text, record) => {
        return record.name
      }
    },
    {
      title: '新增客户数',
      width: '25%',
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
          dataSource={this.props.totalByCity}
          pagination={false}
          scroll={{y: 300}}
        />
      </div>
    )
  }
}
export default Main

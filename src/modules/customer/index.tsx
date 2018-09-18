import React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { DetailProps } from './customer'
import ContentBox from '@/modules/common/content'
const styles = require('./index.styl')
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
}
class Main extends React.Component {
  public state: States = {
    dataSource: [],
    selectedRowKeys: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName'
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '联系电话',
    dataIndex: 'contactPhone'
  }, {
    title: '空置天数',
    dataIndex: 'vacantDays'
  }, {
    title: '城市',
    dataIndex: 'cityName'
  }, {
    title: '客户来源',
    dataIndex: 'customerSource'
  }, {
    title: '入库时间',
    dataIndex: 'createTime'
  }]
  public onSelectAllChange () {
    console.log('select')
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <ContentBox title='我的客资'>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          bordered
          rowKey={'customerId'}
        />
        <div className={styles.btn}>
          <Button type="primary" className={styles.mr10}>全选</Button>
          <Button type="primary" className={styles.mr10}>手工分配</Button>
          <Button type="primary" className={styles.mr10}>应用自动分配</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main

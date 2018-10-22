import React from 'react'
import { Table, Icon, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import _ from 'lodash'
const styles = require('@/modules/outsite/styles/tpllist.styl')
interface Props {
  dataSource: OutSite.SubTaskItem[]
  onOk?: (data?: OutSite.SubTaskItem[]) => void
}
interface State {
  dataSource: OutSite.SubTaskItem[]
}
class Main extends React.Component<Props, State> {
  public state: State = {
    dataSource: this.props.dataSource || []
  }
  public columns: ColumnProps<OutSite.SubTaskItem>[] = [{
    title: '顺序',
    dataIndex: 'sort',
    render: (text, item) => {
      return item.sort ? item.sort : 1
    }
  }, {
    title: '名称',
    dataIndex: 'name'
  }, {
    title: '排序',
    dataIndex: 'take',
    render: (text, item) => {
      const { dataSource } = this.state
      return (
        <span>
          <span
            className={`likebtn ${item.sort === 1 ? styles.disabled : ''}`}
            onClick={() => {
              if (item.sort === 1) {
                return
              }
              this.sortItem.bind(this)(item, 'up')
            }}
          >
            <Icon type='caret-up' />
          </span>
          <span
            className={`likebtn ${item.sort === dataSource.length ? styles.disabled : ''}`}
            onClick={() => {
              if (item.sort === dataSource.length) {
                return
              }
              this.sortItem.bind(this)(item, 'down')
            }}
          >
            <Icon type='caret-down' />
          </span>
        </span>
      )
    }
  }]
  public componentWillReceiveProps (props: Props) {
    this.setState({
      dataSource: props.dataSource
    })
  }
  public sortItem (item: OutSite.SubTaskItem, action: 'up' | 'down') {
    const { dataSource } = this.state
    // const {checkedIdMap} = this.state
    if (action === 'up') {
      if (item.sort !== 1) {
        const nitem = dataSource[item.sort - 2]
        nitem.sort = nitem.sort + 1
        item.sort = item.sort - 1
        // checkedIdMap[item.id] = item
        // checkedIdMap[nitem.id] = nitem
      }
    }
    if (action === 'down') {
      if (item.sort !== dataSource.length) {
        const nitem = dataSource[item.sort]
        nitem.sort = nitem.sort - 1
        item.sort = item.sort + 1
        // checkedIdMap[item.id] = item
        // checkedIdMap[nitem.id] = nitem
      }
    }
    this.setState({
      // checkedIdMap
    }, () => {
      this.sortData()
    })
  }
  public sortData () {
    let { dataSource } = this.state
    dataSource = _.sortBy(dataSource, (item) => {
      return item.sort
    })
    console.log(dataSource, 'sort')
    this.setState({
      dataSource
    })
  }
  public render () {
    const dataSource = this.state.dataSource || []
    return (
      <div>
        <Table
          rowKey='id'
          bordered={false}
          size={`small`}
          rowClassName={(record, index) => {
            return index % 2 === 0 ? styles.roweven : styles.rowodd
          }}
          columns={this.columns}
          dataSource={dataSource}
          pagination={false}
        />
        <div className={styles.actbtns}>
          <Button
            onClick={() => {
              if (this.props.onOk) {
                this.props.onOk(this.state.dataSource)
              }
            }}
            type={`primary`}
          >
            保存
          </Button>
        </div>
      </div>
    )
  }
}
export default Main

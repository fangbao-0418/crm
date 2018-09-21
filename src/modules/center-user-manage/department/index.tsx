import React from 'react'
import { Button, Table, Divider } from 'antd'
import ContentBox from '@/modules/common/content'

const styles = require('./style')

interface State {
  dataSource: any[]
}

class Main extends React.Component {
  public state: State = {
    dataSource: [
      {
        id: 1,
        name: '技术部',
        dataIndex: 'name',
        children: [
          {
            id: 2,
            name: '前端',
            dataIndex: 'name'
          },
          {
            id: 3,
            name: '后端',
            dataIndex: 'name'
          }
        ]
      }
    ]
  }

  public render () {
    const columns = [{
      title: '部门名称',
      dataIndex: 'name'
    }, {
      title: '操作',
      render: () => {
        return (
          <div>
            <a>添加子部门</a>
            <Divider type='vertical'/>
            <a>修改</a>
            <Divider type='vertical'/>
            <a>禁用</a>
            <Divider type='vertical'/>
            <a>删除</a>
          </div>
        )
      }
    }]
    return (
      <ContentBox title='部门'>
        <div className={styles.topWrap}>
          <Button type='primary'>添加一级部门</Button>
        </div>
        <Table
          style={{paddingTop: '10px'}}
          dataSource={this.state.dataSource}
          columns={columns}
          rowKey='id'
          pagination={{
            showQuickJumper: true
          }}
        />
      </ContentBox>
    )
  }
}

export default Main

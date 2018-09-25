import React from 'react'
import { Button, Table, Divider } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'

const styles = require('./style')

interface State {
  dataSource: any[]
}

class Main extends React.Component {
  public state: State = {
    dataSource: [
      {
        id: 1,
        name: '111',
        children: [
          {
            id: '12',
            name: '111222'
          }
        ]
      },
      {
        id: 2,
        name: '222'
      }
    ]
  }

  public render () {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        render: () => {
          return (
            <div>
              <a>修改</a>
              <Divider type='vertical'/>
              <a>添加子页面权限</a>
              <Divider type='vertical'/>
              <a>禁用</a>
              <Divider type='vertical'/>
              <a>删除</a>
            </div>
          )
        }
      }
    ]
    return (
      <ContentBox
        title='角色'
        rightCotent={(
          <AddButton
            title='添加角色'
            onClick={() => {}}
          />
        )}
      >
        <div className={styles.wrap}>

          <div className={styles.tabWrap}>
            <div className={styles.active}>系统角色</div>
            <div>代理商角色</div>
          </div>

          <div className={styles.contentWrap}>
            <Table
              dataSource={this.state.dataSource}
              columns={columns}
              pagination={{
                showQuickJumper: true
              }}
            />
            <Button type='primary' className={styles.delBtn}>批量删除</Button>
          </div>
        </div>
      </ContentBox>
    )
  }
}

export default Main

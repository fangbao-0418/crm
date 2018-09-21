import React from 'react'
import { Input, Button, Table } from 'antd'
import ContentBox from '@/modules/common/content'

const styles = require('./index.styl')

interface State {
  dataSource: any[]
}

class Main extends React.Component<any, State> {

  public state = {
    dataSource: [{}]
  }

  public render () {

    const columns: any[] = []

    return (
      <ContentBox title='账号'>
        <div className={styles.topWarp}>
          <div className={styles.left}>
            <Input
              placeholder='请输入姓名'
            />
            <Input
              placeholder='请输入手机号'
            />
            <Input
              placeholder='请输入部门名称'
            />
          </div>
          <div className={styles.right}>
            <Button type='primary' style={{marginRight: '10px'}}>添加账号</Button>
            <Button>批量删除</Button>
          </div>
        </div>

        <div style={styles.tableWrap}>
          <Table dataSource={this.state.dataSource} columns={columns} />
        </div>
      </ContentBox>
    )
  }
}

export default Main
